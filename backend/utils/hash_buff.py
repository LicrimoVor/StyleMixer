from typing import Literal
import hashlib

BUFF_SIZE = 65536


def hash_buff(buff: bytes, mode: Literal["md5", "sha1"] = "md5") -> str:
    decoder: hashlib._Hash

    match mode:
        case "md5":
            decoder = hashlib.md5()
        case "sha1":
            decoder = hashlib.sha1()

    buff = buff if len(buff) < BUFF_SIZE else buff[:BUFF_SIZE]
    decoder.update(buff)
    return decoder.hexdigest()
