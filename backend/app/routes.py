from flask import jsonify, request
import networkx as nx
from networkx.algorithms.distance_measures import radius, diameter
from networkx import shortest_path, shortest_path_length, NetworkXNoPath
def init_routes(app):

    @app.route('/add_vertex', methods=['POST'])
    def add_vertex():
        data = request.get_json()
        vertex_id = data.get('id')
        if vertex_id and vertex_id not in app.graph:
            app.graph.add_node(vertex_id, label=vertex_id)
            return jsonify({'message': f'Vertex {vertex_id} added'}), 200
        else:
            return jsonify({'error': 'Invalid vertex id or vertex already exists'}), 400

    @app.route('/get_graph', methods=['GET'])
    def get_graph():
        response = {
            'nodes': [{'data': {'id': node, 'label': app.graph.nodes[node]['label']}} for node in app.graph.nodes],
            'edges': [{'data': {'source': edge[0], 'target': edge[1], 'weight': app.graph.edges[edge]['weight']}} for edge in app.graph.edges]
        }
        return jsonify(response), 200
    
    
    @app.route('/set_graph_type', methods=['POST'])
    def set_graph_type():
        data = request.get_json()
        print('dsadasasdasds', data.get('type'))
        # graph_type = data.get('type', 'directed')
        if app.graph and app.graph.number_of_nodes() > 0:
            return jsonify({'error': 'Cannot change graph type with existing nodes'}), 400

        if data.get('type'):
            print('direcionado func')
            app.graph = nx.MultiDiGraph()
        else:
            print('direcionado func')

            app.graph = nx.MultiGraph()

        return 200
    
    @app.route('/clear_graph', methods=['POST'])
    def clear_graph():
        app.graph.clear() 
        return jsonify({'message': 'Graph cleared'}), 200
    
    @app.route('/add_edge', methods=['POST'])
    def add_edge():
        data = request.get_json()
        source = data.get('source')
        target = data.get('target')
        weight = data.get('weight', 0)

        try:
            weight = float(weight)  # converte o peso para float
        except ValueError:
            return jsonify({'error': 'Invalid weight value'}), 400

        if source and target and source in app.graph and target in app.graph:
            if isinstance(app.graph, (nx.MultiDiGraph)):
                if not app.graph.has_edge(source, target):
                    app.graph.add_edge(source, target, weight=weight)
                    return jsonify({'message': f'Directed edge added between {source} and {target} with weight {weight}'}), 200
                else:
                    return jsonify({'error': 'Directed edge already exists'}), 400
            else:
                if not app.graph.has_edge(source, target) and not app.graph.has_edge(target, source):
                    app.graph.add_edge(source, target, weight=weight) 
                    return jsonify({'message': f'Undirected edge added between {source} and {target} with weight {weight}'}), 200
                else:
                    return jsonify({'error': 'Undirected edge already exists'}), 400
        else:
            return jsonify({'error': 'One or both vertices not found'}), 400


    @app.route('/remove_last_vertex', methods=['POST'])
    def remove_last_vertex():
        if app.graph.nodes:
            last_vertex = sorted(app.graph.nodes())[-1] 
            connected_edges = list(app.graph.edges(last_vertex))  
            num_edges_removed = len(connected_edges)  
            app.graph.remove_node(last_vertex)  
            return jsonify({
                'message': f'Vertex {last_vertex} removed',
                'vertexId': last_vertex,
                'edgesRemoved': num_edges_removed  
            }), 200
        else:
            return jsonify({'error': 'No vertices to remove'}), 400
      
    @app.route('/graph_metrics', methods=['GET'])
    def graph_metrics():
        order = app.graph.number_of_nodes()
        size = app.graph.number_of_edges()
        return jsonify({'order': order, 'size': size}), 200
   
    @app.route('/get_adjacency_list', methods=['POST'])
    def get_adjacency_list():
        data = request.get_json()
        vertex_id = data.get('vertex_id')
        if vertex_id not in app.graph:
            return jsonify({'error': 'Vertex not found'}), 404
        print(app.graph)
        if isinstance(app.graph, nx.MultiDiGraph): #direcionados
            print('ENTREI AQUI')
            successors = list(app.graph.successors(vertex_id))
            predecessors = list(app.graph.predecessors(vertex_id))
            return jsonify({
                'successors': successors,
                'predecessors': predecessors
            }), 200
        if isinstance(app.graph, nx.MultiGraph): 
            print('entrei nao direct')
            neighbors = list(app.graph.neighbors(vertex_id))
            return jsonify({'neighbors': neighbors}), 200
        
    @app.route('/get_vertex_degree', methods=['POST'])
    def get_vertex_degree():
        data = request.get_json()
        vertex_id = data.get('vertex_id')
        if vertex_id not in app.graph:
            return jsonify({'error': 'Vertex not found'}), 404

        if isinstance(app.graph, (nx.MultiDiGraph)):
            in_degree = app.graph.in_degree(vertex_id)
            out_degree = app.graph.out_degree(vertex_id)
            return jsonify({
                'in_degree': in_degree,
                'out_degree': out_degree
            }), 200
        else:
            degree = app.graph.degree(vertex_id)
            return jsonify({'degree': degree}), 200
    @app.route('/check_adjacency', methods=['POST'])
    def check_adjacency():
        data = request.get_json()
        vertex1 = data.get('vertex1')
        vertex2 = data.get('vertex2')

        if vertex1 and vertex2 and vertex1 in app.graph and vertex2 in app.graph:
            are_adjacent = app.graph.has_edge(vertex1, vertex2) or app.graph.has_edge(vertex2, vertex1)
            return jsonify({'are_adjacent': are_adjacent}), 200
        else:
            return jsonify({'error': 'One or both vertices not found'}), 404
    
    @app.route('/shortest_path', methods=['POST'])
    def get_shortest_path():
        data = request.get_json()
        source = data.get('source')
        target = data.get('target')

        try:
            path = shortest_path(app.graph, source=source, target=target, weight='weight')
            cost = shortest_path_length(app.graph, source=source, target=target, weight='weight')
            return jsonify({'path': path, 'cost': cost}), 200
        except NetworkXNoPath:
            return jsonify({'error': 'No path exists between the specified vertices'}), 404
        except KeyError:
            return jsonify({'error': 'One or both vertices not found'}), 404
        