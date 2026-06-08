# QU Graph Lab Summer 2026: Cops, Robbers, and Barricades

## introduction
Cops and Robbers is a classic pursuit-evasion game where the environment is modelled as a graph, and each player (team pursuit vs team evade) occupies a node on the graph. If a pursuer (cop) occupies the same node as an evader, the evader (robber) is captured. If one pursuer is enough to ensure the eventual capture of the robber, then the graph is called a cop-win-graph. In this case, a single evader can always be captured in time linear to the number of nodes n on the graph. Capturing r evaders with k pursuers can take the order of rn time as well, but the exact bounds for k>1 are still unknown. (Some variants allow robbers to have "infinite velocity", allowing them to move to any node on the graph as long as there's a path between original and final nodes. Finding the number of cops necessary to capture one robber with infinite velocity in G is equivalent to finding the treewidth of G.)  

Marcos et al. provided an algorithm that computes the minimal completion time strategy for cops to capture robbers if the players make decisions based on perfect knowledge, but this algorithm does not scale well. Mann et. al. reproduces an algorithm in Python proposed by Petr et al. in 2022 which determines whether a graph is k-copwin.

This repo is mostly a storage space for papers and my attempts at Python simulations. 

## the plan 
I aim to apply Mann's Python implementation to Dr. Meger's novel version of the game with a new mechanic: barricades, as introduced in her 2014 thesis. 

My eventual goal is to create a simulation/algorithmic implementation of solving the barricade-cop-number, and investigating whether or not I can reduce the complexity of the algorithm with a small key. My first step is to make a game engine in React, which will let me visualize the problem and log game states. From there, I will find out how to calculate the complexity of the initial algorithm, and see if I can reduce it with a small key. 
