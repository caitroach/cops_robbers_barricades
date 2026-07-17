# it's absolutely psychotic to do this without libraries but im testing myself. 

# builds all graphs from the thesis and writes them to graphs.json

import json 
import math 

'''
helper functions!! woo 
'''

def node(id, x, y):
    return {
        "id": id,
        "x": round(x,4),
        "y": round(y,4)
    }

def circle_nodes(n, start_id=0, cx=0.5, cy=0.5, r=0.36, angle_offset=0):
    # n nodes arranged in a circle. 
    nodes = [] 
    for i in range(n):
        angle = 2*math.pi*i/n+angle_offset
        nodes.append(node(start_id+i, cx+r*math.cos(angle), cy + r*math.sin(angle)))
    return nodes
    
def path_nodes(n, x0=0.05, x1=0.95, y=0.05):
    # n nodes in a horizontal line
    return [node(i, x0+i*(x1-x0)/(n-1),y) for i in range(n)]

def path_edges(n, start_id=0):
    return [[start_id+i, start_id+i+1] for i in range(n-1)]

def cycle_edges(n, start_id=0):
    return [[start_id+i, start_id+(i+1)%n] for i in range(n)]

def graph(label, desc, nodes, edges):
    return {
        "label": label,
        "desc": desc,
        "nodes": nodes, 
        "edges": edges
    }

'''
graph definitions 
'''

def make_complete_bipartite(num_sets, num_vertices): # k: number of sets; n: number of nodes in those sets
    # should check int types but i won't 
    sizes = [num_vertices]*num_sets 

    nodes = []
    set_id = [] 
    node_id = 0 
    x_positions = [0.05+i*(0.9/(num_sets-1)) for i in range(num_sets)]

    for i, size in enumerate(sizes):
        ids = [] 
        for j in range(size):
            y = 0.05 if size == 1 else 0.1+j*(0.8/(size-1))
            nodes.append(node(node_id, x_positions[i], y))
            ids.append(node_id)
            node_id+=1
        set_id.append(ids)
    
    edges = [] 
    for i in range(num_sets-1):
        for u in set_id[i]:
            for v in set_id[i+1]:
                edges.append([u,v])
    return graph(
        f"staged complete bipartite ({'-'.join(map(str, sizes))})",
        f"path on {num_sets} sets, complete bipartite between sets",
        nodes, edges
    ) 



# probs would make more sense if this was a general function but i dunnooo
def make_path5():
    nodes = path_nodes(5)
    edges= path_edges(5)
    return graph (
        "path P₅", # i hope this renders, i dunno about the subscript
        "path on 5 vertices.",
        nodes, edges
    )

def make_path7(): 
    nodes = path_nodes(7)
    edges = path_edges(7)
    return graph ( 
        "path P₇",
        "path on 7 vertices.", 
        nodes, edges
    )

def make_path12():
    nodes = path_nodes(12)
    edges = path_edges(12)
    return graph ( 
        "path P₁₂",
        "path on 12 vertices.",
        nodes, edges
    )

def make_cycle5():
    nodes = circle_nodes(5, angle_offset=-math.pi/2)
    edges = cycle_edges(5)
    return graph( 
        "cycle C₅",
        "5-cycle. discussed as a base  case for odd cycles on p.25",
        nodes, edges
    )

def make_cycle6():
    nodes = circle_nodes(6, angle_offset=-math.pi / 2)
    edges = cycle_edges(6)
    return graph(
        "cycle C₆",
        "6-cycle (even).",
        nodes, edges
    )
 
 
def make_cycle12():
    nodes = circle_nodes(12, r=0.4, angle_offset=-math.pi / 2)
    edges = cycle_edges(12)
    return graph(
        "cycle C₁₂",
        "12-cycle.",
        nodes, edges
    )
 
# def make_caterpillar():  # i hope this is right im super conufsesd :D 
#     nodes = [
#         node(0, 0.15, 0.5), node(1, 0.3, 0.5),
#         node(2, 0.5, 0.5), node(3,0.7,0.5),
#         node(4, 0.85,0.5),
#         node(5, 0.15,0.27), node(6, 0.3,0.27),
#         node(9,0.5,0.73), node(8,0.5,0.27),
#         node(11,0.85,0.27), node(12,0.85, 0.73),
#     ]
#     edges = [
#         [0,1], [1,2],[2,3],[3,4],           # spine
#         [0,5],[1,6],[1,7],[2,8],[2,9],[3,10],[4,11],[4,12],  # leaves
#     ]
#     return graph(
#         "caterpillar tree",
#         "a tree with all nodes within 1 distance of a central spine",
#         nodes, edges
#     ) 
# may not use this 

# def spider? def tall tree? what are some interesting cases? 

def make_petersen():
    outer = circle_nodes(5, start_id=0, r=0.38, angle_offset=-math.pi/2)
    inner = circle_nodes(5, start_id=5, r=0.18, angle_offset=-math.pi/2)
    nodes = outer + inner 
    edges = ( 
        cycle_edges(5, start_id=0) + # outer pentagon
        [[i,i+5] for i in range(5)] +  # spokes 
        [[5+i, 5+(i+2)%5] for i in range(5)] # inner pentagram 
    )
    return graph(
        "petersen graph",
        "cop number 2 classically",
        nodes, edges
    )

# oo could be dodecahedron. organize this into a logical list of stuff to add + ask Dr Meger...?

def make_grid(rows, cols):
    nodes = [
        node(r*cols+c, 0.1 + c*0.8/(cols-1), 0.15 + r*0.7/(rows-1))
        for r in range(rows) for c in range(cols)
    ]
    edges = []
    for r in range(rows):
        for c in range(cols):
            if c < cols-1: edges.append([r*cols+c, r*cols+c+1])
            if r < rows-1: edges.append([r*cols+c,(r+1)*cols+c])
    return nodes, edges

def make_grid3x4():
    nodes, edges = make_grid(3, 4)
    return graph( # vscode keeps saying this is not closed, but that is just erroneous. it is. i promise
        "grid 3x4",
        "3x4 grid.  cop number 2",
        nodes, edges
    )

def make_grid3x3():
    nodes, edges = make_grid(3, 3)
    return graph(
        "grid 3x3",
        "cop number 2",
        nodes, edges 
    )

def make_necklace(k):
    # a necklace graph is a chain of k diamond beads. each bead 
    # is a 4-cycle (diamond shape). adjacent beads share a vertex. 
    tip_xs = [0.05+i*0.9/k  for i in range(k+1)]
    top_y, bot_y, mid_y = 0.27, 0.73, 0.5
    nodes = [] 
    edges = [] 
    id_counter = [0]

    def next_id():
        v = id_counter[0]; id_counter[0] += 1; return v
    
    tip_ids = [next_id() for _ in range(k+1)]
    for i, tx in enumerate(tip_xs):
        nodes.append(node(tip_ids[i], tx, mid_y))
    
    for i in range(k):
        mid_x = (tip_xs[i] + tip_xs[i+1])/2
        top_id=next_id(); nodes.append(node(top_id, mid_x, top_y))
        bot_id= next_id(); nodes.append(node(bot_id, mid_x, bot_y))
        edges += [
            [tip_ids[i], top_id], [tip_ids[i], bot_id],
            [top_id, tip_ids[i+1]],
            [bot_id, tip_ids[i+1]], # yo im so confused idk if this is right
        ]
    return nodes, edges

def make_necklace3():
    nodes, edges = make_necklace(3)
    return graph(
        "necklace N₃",
        "three 4-cycles in a chain. see ch.3 for distinguishing between local vs.global barricade rules.",
        nodes, edges
    )

def make_necklace4():
    nodes, edges = make_necklace(4)
    return graph ( 
        "necklace N₄",
        "four 4-cycles in a chain. see ch.3 for distinguishing between local and global barricade rules.",
        nodes, edges 
    )


# hypercube? prism? what other shapes should i be making? 


# finally build + serve graphs 

def build_all():
    return {
        "path5": make_path5(),
        "path7":       make_path7(),
        "path12":      make_path12(),
        "cycle5":      make_cycle5(),
        "cycle6":      make_cycle6(),
        "cycle12":     make_cycle12(),
        "petersen":    make_petersen(),
        "grid3x3":     make_grid3x3(),
        "grid3x4":     make_grid3x4(),
        "necklace3":   make_necklace3(),
        "necklace4":   make_necklace4(),
    }

if __name__ == "__main__":
    graphs = build_all()
    with open("graphs.json", "w") as f:
        json.dump(graphs, f, indent=2)
        print(f"wrote graphs.json with {len(graphs)} graphs. yay!")
        
    for key, g in graphs.items():
        print(f"{key:15s} {len(g['nodes'])} nodes {len(g['edges']):2d} edges")
