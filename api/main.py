from flask import Flask, request
from functions.packets import (
    get_layers_list,
    get_layer_options,
    create_instance_with_option,
)
from functions.utils import generate_uuid
import json

app = Flask(__name__)

PACKETS = dict()


@app.route("/get_layers_list")
def get_layers_list_endpoint():
    layers = get_layers_list()
    return {"layers": layers}


@app.route("/get_layer_fields")
def get_layer_fields_endpoint():
    layer_name = request.args.get("layer_name")
    fields = get_layer_options(layer_name)
    return {"fields": fields}


@app.route("/create_packet")
def create_packet_endpoint():
    layers = request.args.get("layers")
    layers = json.loads(layers)

    print(layers)

    if not isinstance(layers, list):
        return {"error": "Layers must be a list"}

    if len(layers) == 0:
        return {"error": "No layers provided"}

    layer_instances = []
    for layer in layers:
        layer_name = layer["layer_name"]
        options = layer["options"]
        instance = create_instance_with_option(layer_name, options)
        layer_instances.append(instance)

    packet = layer_instances[0]
    for layer in layer_instances[1:]:
        packet = packet / layer

    packet_id = generate_uuid()
    PACKETS[packet_id] = packet

    return {"packet_id": packet_id}


# @app.route("/send_packet")
# def hello_world():
#     return "Hello, World!"


if __name__ == "__main__":
    app.run(debug=True)
