import uuid


def generate_uuid():
    return str(uuid.uuid4())


def is_hexadecimal(string):
    start_offset = string[:2]
    if start_offset == "0x":
        return True
    return False


def is_integer(string):
    try:
        int(string)
        return True
    except:
        return False


def is_float(string):
    try:
        float(string)
        return True
    except:
        return False


def is_none(string):
    if string == "None":
        return True
    return False


def is_boolean(string):
    if string == "True" or string == "False":
        return True
    return False


def is_list(string):
    if string[0] == "[" and string[-1] == "]":
        return True
    return False


def auto_convert(string):
    if is_hexadecimal(string):
        return int(string, 16)
    elif is_integer(string):
        return int(string)
    elif is_float(string):
        return float(string)
    elif is_boolean(string):
        return bool(string)
    elif is_none(string):
        return None
    elif is_list(string):
        return eval(string)
    else:
        return string
