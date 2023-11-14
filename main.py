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
    return get_layer_instance_options(instance)


def create_instance_with_option(layer_name, options):
    _instance_reference = create_layer_instance_reference(layer_name)
    return _instance_reference(**options)


options = get_layer_instance_options("IP")
instance = create_instance_with_option("IP", options)

packet = instance / instance

packet.show()
