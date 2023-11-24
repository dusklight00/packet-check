# from functions.packets import create_instance_with_option
# from functions.utils import auto_convert

# option = {
#     "dst": "ff:ff:ff:ff:ff:ff",
#     "src": "14:75:5b:46:59:2e",
#     "type": auto_convert("0x9000"),
# }
# instance = create_instance_with_option("Ether", option)
# print(instance)

import io
import sys


def check_packet_code(packet, code):
    modified_code = code + "\nresult = check(packet) \nprint(result)"
    buffer = io.StringIO()
    sys.stdout = buffer

    try:
        exec(modified_code)
    except Exception as e:
        print(e)
        return False
    finally:
        output = buffer.getvalue()
        sys.stdout = sys.__stdout__
        buffer.close()

    return output


CODE = """
def check(packet):
    return packet
"""

result = check_packet_code("asd", CODE)
print(result)
