
def make_path(n): # a straight path with n nodes
    graph = {}
    for i in range(n):
        neighbors = []
        if i > 0:
            neighbors.append(i - 1)
        if i < n - 1:
            neighbors.append(i + 1)
        graph[i] = neighbors
    return graph


def make_cycle(n): # a cycle with n nodes 
    graph = {}
    for i in range(n):
        left  = (i - 1) % n
        right = (i + 1) % n
        graph[i] = [left, right]
    return graph


def make_complete(n): # complete graph k(n)
    graph = {}
    for i in range(n):
        graph[i] = [j for j in range(n) if j != i]
    return graph


def make_tree_from_edges(num_nodes, edge_list): # makes a tree from a manual list of edges
    graph = {i: [] for i in range(num_nodes)}
    for a, b in edge_list:
        graph[a].append(b)
        graph[b].append(a)
    return graph


def make_necklace():
 # necklace graph from thesis: 2 triangles joined by a shared edge
    edges = [
        (0, 1),
        (1, 2),
        (2, 0),  # first triangle
        (2, 3),
        (3, 4),
        (4, 2),  # second triangle
    ]
    return make_tree_from_edges(5, edges)


def make_petersen():
    edges = [
        # outer cycle
        (0, 1), (1, 2), (2, 3), (3, 4), (4, 0),
        # spokes
        (0, 5), (1, 6), (2, 7), (3, 8), (4, 9),
        # inner pentagram
        (5, 7), (7, 9), (9, 6), (6, 8), (8, 5),
    ]
    return make_tree_from_edges(10, edges)


def make_grid(rows, cols): # grid from rows and columns
    graph = {}
    for r in range(rows):
        for c in range(cols):
            node = r * cols + c
            neighbors = []
            if r > 0:           neighbors.append((r-1) * cols + c)  # up
            if r < rows - 1:    neighbors.append((r+1) * cols + c)  # down
            if c > 0:           neighbors.append(r * cols + (c-1))  # left
            if c < cols - 1:    neighbors.append(r * cols + (c+1))  # right
            graph[node] = neighbors
    return graph


# selector 
AVAILABLE_GRAPHS = [
    "path",
    "cycle",
    "complete",
    "tree",
    "necklace",
    "petersen",
    "grid",
]

def get_graph(name, **kwargs): # get graph by name
    if name == "path":
        n = kwargs.get("n", 6)
        return make_path(n)

    elif name == "cycle":
        n = kwargs.get("n", 6)
        return make_cycle(n)

    elif name == "complete":
        n = kwargs.get("n", 4)
        return make_complete(n)

    elif name == "necklace":
        return make_necklace()

    elif name == "petersen":
        return make_petersen()

    elif name == "grid":
        rows = kwargs.get("rows", 3)
        cols = kwargs.get("cols", 3)
        return make_grid(rows, cols)

    elif name == "tree":
        num_nodes = kwargs["num_nodes"]
        edges     = kwargs["edges"]
        return make_tree_from_edges(num_nodes, edges)

    else:
        raise ValueError(f"Unknown graph '{name}'. Choose from: {AVAILABLE_GRAPHS}")


def print_graph(graph):
    """Print adjacency list in a readable way."""
    for node in sorted(graph):
        print(f"  node {node}: connects to {graph[node]}")


# demo !! u can run it to see all the graphs 
if __name__ == "__main__":
    examples = [
        ("path",     {"n": 5}),
        ("cycle",    {"n": 5}),
        ("complete", {"n": 4}),
        ("necklace", {}),
        ("petersen", {}),
        ("grid",     {"rows": 2, "cols": 3}),
        ("tree",     {"num_nodes": 5, "edges": [(0,1),(0,2),(1,3),(1,4)]}),
    ]

    for name, kwargs in examples:
        print(f"\n=== {name.upper()} {kwargs} ===")
        g = get_graph(name, **kwargs)
        print_graph(g)
