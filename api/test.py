from functions.packets import create_instance_with_option
from functions.utils import auto_convert

option = {
    "dst": "ff:ff:ff:ff:ff:ff",
    "src": "14:75:5b:46:59:2e",
    "type": auto_convert("0x9000"),
}
instance = create_instance_with_option("Ether", option)
print(instance)
