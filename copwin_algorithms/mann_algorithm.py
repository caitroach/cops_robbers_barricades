'''
citation: Meagan Mann's paper! see papers/mann.pdf
putting this in a python file so i can tweak it 
to eventually add barricades

anyway this is an implementation of Petr et al.'s algorithm with a complexity of 
O(kn^(k+2))
uses a BFS-like traversal to mark winning states for cops
starting with base-case copwin states and propagating backward through 
space-state tree 
'''

from collections import deque 
from itertools import product 
import networkx as nx 

def is_k_copwin(graph, k): # graph is undirected with no self-loops
    n = len(graph)
    if k>=n:
        return True
    
    cops_win = {} # will b a boolean array with all states set to 0 (), if a state is copwin then it is set to 1
    counter = {} # tracks escape options available to the robber in each turn state
    # if the counter has no safe moves left from a state, then the cops win.
    q = {} # this is dumb but i can never remember how to spell quueueueue 
    # so i just call it q 
    # boooo tomato tomato :(
    vertices = list(range(n)) # makes list of vertices [0,1,2,...,n] i think
    preds = {} 
    states = []

    for pos in product(vertices, repeat=(k+1)):
        for t in range(0,k+1):
            s = (*pos, t)
            states.append(s)
            cops_win[s] = 0 
            if t==k:
                counter[s] = len(graph[pos[0]]) + 1
            else: 
                counter[s] = 0

    for s in states: 
        for i in range(1, k+1):
            robber = s[0]
            cops = s[1:-1]
            t = s[-1]
            if t == i and robber in cops: 
                q.append(s) 
                cops_win[s] = 1
                break 
            
    def predecessors(state):
        positions = list(state[:-1])
        t = state[-1]
        preds = []

        for prev_pos in graph[positions[t]] + [positions[t]]: 
            prev_positions = positions.copy()
            prev_positions[t] = prev_pos
            preds.append(tuple(prev_positions+[(t-1)%(k+1)]))
            return preds 
        
    '''
    reverse BFS: each game state s is dequeued (i can't spell) from Q in
    FIFO order...
    '''
    while q: 
        s = q.popleft()
        _, *_, t = s # this unpacks states to grab the first and last element
        # so this unpacks the turn index while ignoring positional details

        if t !=0: # if a cop just moved, then any predecessor state from the game transitioned into s is also a winning state for cops.
            for pred in predecessors(s):
                if cops_win[pred] == 0:
                    q.append(pred)
                    cops_win[pred] = 1 
                    preds[pred] = preds.get(pred,[]) + [s]
        
        else: 
            for pred in predecessors(s):
                counter[pred] -=1 
                if counter[pred] == 0:
                    q.append(pred)
                    cops_win[pred]=1
                    preds[pred] = preds.get(pred,[]) + [s]
    
    for cop_pos in (product(vertices, repeat=k)):
        if all (cops_win[(robber_pos, *cop_pos, 0)] == 1 for robber_pos in vertices):
            return True # the graph is cop-win iff for every starting position of the robber,
        # those game-states are marked as cop-win. otherwise if no guaranteed win strategy exists, then the graph is not k-copwin.
        
    return False 
        

