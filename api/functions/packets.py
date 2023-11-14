import re
from scapy.all import *
import importlib
import io
import contextlib


def create_layer_instance_reference(layer_name):
    module_name = "scapy.all"
    module = importlib.import_module(module_name)
    class_ = getattr(module, layer_name)
    instance = class_
    return instance


def get_layer_fields_and_defaults(layer_name):
    _instance_reference = create_layer_instance_reference(layer_name)
    instance = _instance_reference()
    fields_and_defaults = {
        field.name: instance.default_field(field) for field in instance.fields_desc
    }
    return fields_and_defaults


def get_layer_instance_options(instance):
    PATTERN = r"[ ]+([A-Za-z_0-9]+)[ ]+= '?(.+)?'?"
    with io.StringIO() as buf, contextlib.redirect_stdout(buf):
        instance.show()
        output = buf.getvalue()
    matches = [
        re.match(PATTERN, line)
        for line in output.split("\n")
        if re.match(PATTERN, line)
    ]
    groups = [match.groups() for match in matches if match]
    return dict(groups)


def get_layer_options(layer_name):
    _instance_reference = create_layer_instance_reference(layer_name)
    instance = _instance_reference()
    instance.show()
    return get_layer_instance_options(instance)


def create_instance_with_option(layer_name, options):
    _instance_reference = create_layer_instance_reference(layer_name)
    return _instance_reference(**options)


from scapy.all import Ether, Padding


def is_malformed(packet):
    # try:
    #     # Try to dissect the packet
    #     Ether(packet)
    #     return False
    # except:
    #     # If an exception occurs, the packet is malformed
    #     return True

    return False


def get_layers_list():
    with io.StringIO() as buf, contextlib.redirect_stdout(buf):
        ls()
        output = buf.getvalue()
    layers = [
        layer.split(":")[0].strip()
        for layer in output.split("\n")
        if layer.split(":")[0].strip() != ""
    ]
    return layers
