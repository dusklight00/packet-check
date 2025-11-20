from flask import Flask, request
from flask_cors import CORS, cross_origin
from functions.packets import (
    get_layers_list,
    get_layer_options,
    create_instance_with_option,
    packet_to_dict,
    check_packet_code,
)
from functions.utils import generate_uuid, auto_convert
from multiprocessing import Process, Queue
from scapy.all import send, sniff
import json
from pprint import pprint

app = Flask(__name__)
# CORS(app)
queue = Queue()

PACKETS = dict()
CHECKS = dict()
SNIFFED_PACKET_CACHE = []
SNIFF_PROCESS = None


def packet_callback(packet, queue):
    queue.put(packet)


def start_sniffing(queue, filter=""):
    # Start sniffing packets
    sniff(prn=lambda packet: packet_callback(packet, queue), filter=filter)


def get_sniffed_packets(queue):
    # Get all packets from the queue
    sniffed_packets = []
    while not queue.empty():
        packet = queue.get()
        packet_dict = packet_to_dict(packet)
        packet_dict["packet_object"] = packet
        sniffed_packets.append(packet_dict)
    return sniffed_packets


@app.route("/get_layers_list")
@cross_origin()
def get_layers_list_endpoint():
    layers = get_layers_list()
    return {"layers": layers}


@app.route("/get_layer_fields")
@cross_origin()
def get_layer_fields_endpoint():
    layer_name = request.args.get("layer_name")
    fields = get_layer_options(layer_name)
    return {"fields": fields}


@app.route("/create_packet")
@cross_origin()
def create_packet_endpount():
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

        for key, value in options.items():
            options[key] = auto_convert(value)

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
@cross_origin()
def get_all_packet_ids_endpoint():
    packet_id_dict_map = {
        packet_id: packet["packet_name"] for packet_id, packet in PACKETS.items()
    }
    return packet_id_dict_map


@app.route("/get_packet")
@cross_origin()
def get_packet_endpoint():
    packet_id = request.args.get("packet_id")
    packet = PACKETS.get(packet_id)
    packet_name = packet["packet_name"]
    packet = packet["packet"]
    packet_dict = packet_to_dict(packet)
    return {"packet_name": packet_name, "packet": packet_dict}


@app.route("/remove_packet")
@cross_origin()
def remove_packet_enpoint():
    packet_id = request.args.get("packet_id")
    PACKETS.pop(packet_id)
    return {"success": True}


@app.route("/send_packet")
@cross_origin()
def send_packet_endpoint():
    packet_id = request.args.get("packet_id")
    packet_obj = PACKETS.get(packet_id)
    packet = packet_obj["packet"]
    send(packet)
    return {"success": True}


@app.route("/sniff")
@cross_origin()
def sniff_endpoint():
    sniffed_packets = get_sniffed_packets(queue)
    for packet in sniffed_packets:
        is_malicious = False
        for name, code in CHECKS.items():
            result = check_packet_code(packet, code)
            if isinstance(result, str) and result.strip() == "True":
                is_malicious = True
                break
        packet["is_malicious"] = is_malicious
    sniffed_packets_without_object = sniffed_packets.copy()
    for packet in sniffed_packets_without_object:
        packet.pop("packet_object")
    return {"sniffed_packets": sniffed_packets}


@app.route("/start_sniff")
@cross_origin()
def start_sniff_endpoint():
    filter = request.args.get("filter", "")
    global SNIFF_PROCESS
    if SNIFF_PROCESS is not None:
        return {"success": False}
    SNIFF_PROCESS = Process(
        target=start_sniffing,
        args=(
            queue,
            filter,
        ),
    )
    SNIFF_PROCESS.start()
    return {"success": True}


@app.route("/stop_sniff")
@cross_origin()
def stop_sniff_endpoint():
    global SNIFF_PROCESS
    if SNIFF_PROCESS is None:
        return {"success": False}
    SNIFF_PROCESS.terminate()
    SNIFF_PROCESS = None
    return {"success": True}


@app.route("/process_code", methods=["POST"])
@cross_origin()
def process_code_endpoint():
    data = request.get_json()
    code = data.get("code")
    exec(code)
    return {"success": True}


@app.route("/get_checks")
@cross_origin()
def get_checks_endpoint():
    return {"checks": CHECKS}


@app.route("/add_check", methods=["POST"])
@cross_origin()
def add_check_endpoint():
    data = request.get_json()
    name = data.get("name")
    code = data.get("code")
    CHECKS[name] = code
    return {"success": True}


@app.route("/remove_check", methods=["POST"])
@cross_origin()
def remove_check_endpoint():
    data = request.get_json()
    name = data.get("name")
    print(name)
    CHECKS.pop(name)
    return {"success": True}


if __name__ == "__main__":
    app.run(debug=True)
