# QU Graph Lab Summer 2026: Cops, Robbers, and Barricades

<img width="800" height="413" alt="hh-ezgif com-speed" src="https://github.com/user-attachments/assets/18eea344-f43d-4df1-9588-72507b4cd656" />

This simulation is [LIVE](https://caitroach.github.io/cops_robbers_barricades/gameplay.html). Play it yourself!

## introduction
Cops and Robbers is a perfect information pursuit evasion game played on an undirected, unweighted graph G. Cops and a robber each occupy vertices; on each turn a player may move along an edge or stay where they are. The robber is captured when a cop occupies her vertex. The cop number c(G) is the minimum number of cops that guarantee capture on G. A graph where one cop is sufficient is called cop-win. 

Barricades were introduced in 2016 by Dr. Erin Meger to introduce complexity to the game. Instead of moving on her turn, the robber may place a barricade on a vertex adjacent to her, essentially deleting the node from G. She cannot barricade a vertex a cop is currently occupying. The cop-barricade number c_B(G) is the minimum number of cops that guarantee capture on G with CRB rules.

Marcos et al. give an algorithm computing the minimum-completion-time strategy under perfect information, though it scales poorly. Petr, Portier and Versteegen (2022) improved the runtime for deciding whether a graph is k-copwin, with a Python implementation by Mann et al. This project asks what survives when Meger's barricade rules are added.

## results 
The main object of the study right now is the staged complete bipartite family of G_{d,k}: d completely connected sets of k disjoint nodes. I made a simple React game engine to visualize the problem, then investigated the cop-barricade number of the specific graph to prove a closed form of C_B(G_{d,k}). Full derivation and figures [here](https://github.com/caitroach/cops_robbers_barricades/blob/main/papers/mynotes/Finding%20the%20cop-barricade%20number%20%20for%20complete%20staged%20bipartite%20graphs%20(6).pdf).

<img width="1067" height="893" alt="image" src="https://github.com/user-attachments/assets/a4fc591b-791e-476b-8c72-748e90cb09f4" />

## stay tuned for...
- A formal paper
- A general C_B solver over arbitrary adjacency lists
