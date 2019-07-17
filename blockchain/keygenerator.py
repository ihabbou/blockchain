from ecdsa import SigningKey, VerifyingKey, SECP256k1

sk = SigningKey.generate(curve=SECP256k1)  # uses NIST192p
vk = sk.get_verifying_key()
signature = sk.sign("message")
assert vk.verify(signature, "message")

VerifyingKey