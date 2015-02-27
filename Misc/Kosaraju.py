file = open('test.txt', 'r')

def dfs(graph, vertex, visited, finish, leaders, rank, s):
	if (vertex in visited):
		return

	visited[vertex] = True
	print 'Visiting:', vertex
	leaders[vertex] = s

	if vertex in graph:
		neighbors = graph[vertex];
		for i in xrange(len(neighbors)):
			dfs(graph, neighbors[i], visited, finish, leaders, rank, s);
		
	rank['rank'] += 1
	finish[vertex] = rank['rank']

def iterative_dfs(graph, vertex, visited, finish, leaders, rank, s):
	if (vertex in visited):
		return

	open = [vertex]
	while (len(open) > 0):
		print 'Visiting:', vertex
		vertex = open[0]
		open.pop(0)
		leaders[vertex] = s
		visited[vertex] = True

		if vertex in graph:
			neighbors = graph[vertex]
			for i in neighbors:
				if i not in visited:
					open.append(i)

graph = {}
for line in file:
	i = line.strip().split(' ')
	tail, head = int(i[0]), int(i[1])
	if tail not in graph:
		graph[tail] = []
	graph[tail].append(head)
print 'Successfully read file and created graph!'

reversedGraph = {};
for vertex in graph:
	neighbors = graph[vertex];
	for i in xrange(len(neighbors)):
		if (neighbors[i] not in reversedGraph):
			reversedGraph[neighbors[i]] = [];	
		reversedGraph[neighbors[i]].append(int(vertex));
print 'Successfully reversed graph!'

visited = {}
leaders = {}
finish = {}
rank = {}
rank['rank'] = 0
s = None	# used to find the leader of strongly connected components

# 1st DFS-loop
for i in xrange(len(graph), -1, -1):
	vertex = i + 1
	s = vertex	# set the leader
	iterative_dfs(reversedGraph, vertex, visited, finish, leaders, rank, s)

print 'Completed first DFS-loop'
print leaders
print finish
'''
# replace original graph vertices with finish #'s
newGraph = {};
print graph
for i in xrange(len(graph), -1, -1):
	vertex = i + 1
	if vertex in graph:
		newGraph[finish[vertex]] = graph[vertex];
print 'Used finish array to change vertex names'

# reset global vars
visited = {}
leaders = {}
finish = {}
rank = {}
rank['rank'] = 0
s = None

# 2nd DFS-loop
for i in xrange(len(graph), -1, -1):
	vertex = i + 1
	s = vertex	# set the leader
	dfs(newGraph, vertex, visited, finish, leaders, rank, s)
print 'Completed second DFS-loop'
print leaders
'''