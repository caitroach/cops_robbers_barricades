'''
citation: Meagan Mann's paper! see papers/mann.pdf
implementation of Petr et al.'s algorithm, O(kn^(k+2))
reverse BFS through the state space: start from base-case copwin states
(cop on robber) and propagate backwards.

works natively with graph dicts from graph_builder.py --
anything shaped like {"nodes": [{"id": ...}, ...], "edges": [[u,v], ...]}.
plain adjacency dicts also fine.

changes from the original:
- q is an actual deque (was {}, .append() crashed)
- predecessors() returns AFTER its loop, not inside it my bad lol 
  (early return = only one predecessor per state = wrong answers)
- to_adjacency() adapter so builder graphs plug straight in
- cop_number() convenience wrapper

no barricades yet. this is the base for barricade_solver.py.
'''

from collections import deque
from itertools import product


def to_adjacency(g):
    # graph-builder dict  plain adjacency dict {vertex_id: [neighbors]}
    # if it's already an adjacency dict, pass it through untouched.
    if "nodes" not in g:
        return g  # assume already adjacency
    adj = {n["id"]: [] for n in g["nodes"]}
    for u, v in g["edges"]:
        adj[u].append(v)
        adj[v].append(u)
    return adj


def is_k_copwin(g, k):
    graph = to_adjacency(g)
    n = len(graph)
    if k >= n:
        return True

    cops_win = {}
    counter = {}   # robber escape options per robber-turn state; 0 -> trapped
    q = deque()
    vertices = list(graph.keys())
    states = []

    # state = (robber_pos, cop_1, ..., cop_k, turn)
    # turn 0 = robber moves next, turn i = cop i moves next
    for pos in product(vertices, repeat=(k + 1)):
        for t in range(0, k + 1):
            s = (*pos, t)
            states.append(s)
            cops_win[s] = 0
            if t == k:
                counter[s] = len(graph[pos[0]]) + 1  # neighbors + staying put
            else:
                counter[s] = 0

    # base cases: any cop-turn state where a cop stands on the robber
    for s in states:
        robber = s[0]
        cops = s[1:-1]
        t = s[-1]
        if t >= 1 and robber in cops:
            q.append(s)
            cops_win[s] = 1

    def predecessors(state):
        # states that transition INTO this one: whoever just moved
        # came from a neighbor, or stayed put
        positions = list(state[:-1])
        t = state[-1]
        preds = []
        for prev_pos in graph[positions[t]] + [positions[t]]:
            prev_positions = positions.copy()
            prev_positions[t] = prev_pos
            preds.append(tuple(prev_positions + [(t - 1) % (k + 1)]))
        return preds  # outside the loop!! this was the bug

    # reverse BFS
    while q:
        s = q.popleft()
        t = s[-1]

        if t != 0:
            # a cop just moved into s -> the cop chose this, so the
            # predecessor is copwin too
            for pred in predecessors(s):
                if cops_win[pred] == 0:
                    q.append(pred)
                    cops_win[pred] = 1
        else:
            # robber moved into a copwin state -> burn one escape option
            # in the predecessor. all options burned = trapped.
            for pred in predecessors(s):
                counter[pred] -= 1
                if counter[pred] == 0:
                    q.append(pred)
                    cops_win[pred] = 1

    # copwin iff some cop placement beats EVERY robber start
    for cop_pos in product(vertices, repeat=k):
        if all(cops_win[(r, *cop_pos, 0)] == 1 for r in vertices):
            return True
    return False


def cop_number(g, k_max=None):
    # smallest k that wins. state space is n^(k+1) so cap k_max
    # on anything big.
    graph = to_adjacency(g)
    if k_max is None:
        k_max = len(graph)
    for k in range(1, k_max + 1):
        if is_k_copwin(graph, k):
            return k
    return None


if __name__ == "__main__":
    from docs.graph_builder import build_all, make_complete_bipartite

    graphs = build_all()
    for key, g in graphs.items():
        print(f"{g['label']:40s} c(G) = {cop_number(g, k_max=3)}")

    print()
    for stages in [2, 3, 4]:
        for width in [2, 3]:
            g = make_complete_bipartite(stages, width)
            print(f"{g['label']:40s} c(G) = {cop_number(g, k_max=3)}")