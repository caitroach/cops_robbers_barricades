from collections import deque 
from itertools import combinations 
from typing import Iterator 

'''
defines a new class called Graph which trivially is a collection of nodes and edges
using python to solve it, but the visualization engine will be in React.
'''
Edge = frozenset 
Barricades = frozenset 

def edge(u: int, v: int) -> Edge:
    return frozenset({u,v})

class Graph:
    def __init__(self, n:int, edges: list[tuple[int,int]]): # constructor
        self.n = n #number of vertices
        self.vertices: frozenset[int] = frozenset(range(n))
        self.edges: frozenset[Edge] = frozenset(edge(u,v) for u,v in edges)

        adjacency_list: dict[int, set[int]] = {v: set() for v in range(n)}
        for u, v in edges: 
            adjacency_list[u].add(v)
            adjacency_list[v].add(u)
        
        self._adjacency_list: dict[int, frozenset[int]] = {
            v: frozenset(nbrs) for v, nbrs in adjacency_list.items()
        }

    ''' 
    basic adjacency functions:
    '''

    def neighbour(self, v:int, barricades: Barricades = frozenset()) -> frozenset[int]:
        if not barricades: 
            return self._adjacency_list[v]
        return frozenset(
            u for u in self._adjacency_list[v]
            if edge(v, u) not in barricades
        )
    
    def active_edges(self, barricades: Barricades = frozenset()) -> frozenset[Edge]:
        return self.edges - barricades
     
    
    def are_neighbours(self, u: int, v:int) -> bool:
        return v in self._adjacency_list[u]
    
    def has_edge(self, u: int, v: int, barricades: Barricades = frozenset()) -> frozenset[Edge]:
        return v in self._adjacency_list[u] and edge(u,v) not in barricades


    '''
    connectivity tests:
    '''

    def reachable(self, source: int, barricades: Barricades = frozenset()) -> frozenset[int]:
        # show all vertices reachable from source via non-barricaded edges w BFS
        visited = {source}
        q = deque([source]) # literally cant remember how to spell queueue  oh im done for

        while q:
            v = q.popleft()
            for u in self.neighbour(v, barricades):
                if u not in visited:
                    visited.add(u)
                    q.append(u)
        return frozenset(visited)
            
    # could also rename to connected_component for game logic but shhhh 

    


