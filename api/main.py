from flask import Flask, request
from functions.packets import (
    get_layers_list,
    get_layer_options,
    create_instance_with_option,
    packet_to_dict,
)
from functions.utils import generate_uuid
import json
from scapy.all import Ether, IP, TCP
from pprint import pprint

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
    packet_name = request.args.get("packet_name")
    print(packet_name)
    layers = request.args.get("layers")
    layers = json.loads(layers)

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

    packet_layers = layer_instances[0]
    for layer in layer_instances[1:]:
        packet_layers = packet_layers / layer

    packet_id = generate_uuid()
    packet_object = {
        "packet_name": packet_name,
        "layers": packet_layers,
    }

    PACKETS[packet_id] = packet_object

    return {"packet_id": packet_id}


@app.route("/get_all_packet_ids")
def get_all_packet_ids_endpoint():
    packet_id_dict_map = {
        packet_id: packet["packet_name"] for packet_id, packet in PACKETS.items()
    }
    return packet_id_dict_map


@app.route("/get_packet")
def get_packet_endpoint():
    packet_id = request.args.get("packet_id")
    packet = PACKETS.get(packet_id)
    packet_name = packet["packet_name"]
    packet_layers = packet["layers"]
    packet_dict = packet_to_dict(packet_layers)
    return {"packet_name": packet_name, "layers": packet_dict}


@app.route("/remove_packet")
def remove_packet_enpoint():
    packet_id = request.args.get("packet_id")
    PACKETS.pop(packet_id)
    return {"success": True}


# @app.route("/send_packet")
# def hello_world():
#     return "Hello, World!"


if __name__ == "__main__":
    app.run(debug=True)
