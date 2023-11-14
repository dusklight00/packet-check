from flask import Flask, request
from functions.packets import (
    get_layers_list,
    get_layer_options,
    create_instance_with_option,
    packet_to_dict,
)
from functions.utils import generate_uuid
from multiprocessing import Process, Queue
from scapy.all import send, sniff
import json

app = Flask(__name__)
queue = Queue()

PACKETS = dict()
SNIFFED_PACKET_CACHE = []
SNIFF_PROCESS = None


def packet_callback(packet, queue):
    queue.put(packet)


def start_sniffing(queue):
    # Start sniffing packets
    sniff(prn=lambda packet: packet_callback(packet, queue))


def get_sniffed_packets(queue):
    # Get all packets from the queue
    sniffed_packets = []
    while not queue.empty():
        packet = queue.get()
        packet_dict = packet_to_dict(packet)

        sniffed_packets.append(packet_dict)
    return sniffed_packets


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

    packet = layer_instances[0]
    for layer in layer_instances[1:]:
        packet = packet / layer

    packet_id = generate_uuid()
    packet_object = {
        "packet_name": packet_name,
        "packet": packet,
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
    packet = packet["packet"]
    packet_dict = packet_to_dict(packet)
    return {"packet_name": packet_name, "packet": packet_dict}


@app.route("/remove_packet")
def remove_packet_enpoint():
    packet_id = request.args.get("packet_id")
    PACKETS.pop(packet_id)
    return {"success": True}


@app.route("/send_packet")
def send_packet_endpoint():
    packet_id = request.args.get("packet_id")
    packet_obj = PACKETS.get(packet_id)
    packet = packet_obj["packet"]
    send(packet)
    return {"success": True}


@app.route("/sniff")
def sniff_endpoint():
    sniffed_packets = get_sniffed_packets(queue)
    return {"sniffed_packets": sniffed_packets}


@app.route("/start_sniff")
def start_sniff_endpoint():
    global SNIFF_PROCESS
    if SNIFF_PROCESS is not None:
        return {"success": False}
    SNIFF_PROCESS = Process(target=start_sniffing, args=(queue,))
    SNIFF_PROCESS.start()
    return {"success": True}


@app.route("/stop_sniff")
def stop_sniff_endpoint():
    global SNIFF_PROCESS
    if SNIFF_PROCESS is None:
        return {"success": False}
    SNIFF_PROCESS.terminate()
    SNIFF_PROCESS = None
    return {"success": True}


if __name__ == "__main__":
    app.run(debug=True)
