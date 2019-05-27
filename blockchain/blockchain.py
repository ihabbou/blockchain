import hashlib
from ecdsa import SigningKey, VerifyingKey, SECP256k1

class Transaction():
	def __init__(self, from_address, to_address, amount):
		"""  """
		self.from_address = from_address
		self.to_address = to_address
		self.amount = amount

	def calculate_hash(self):
		"""  """
		return hashlib.sha256(bytearray(f"{self.from_address}{self.to_address}{self.amount}".encode('utf-8'))).hexdigest()

	def sign_transacion(self, signing_key):
		"""  """
		if signing_key.get_verifying_key() != self.to_address:
			raise Exception("You can only sign transactions for your own wallet.")
		hash_tx = self.calculate_hash()
		sig = signing_key.sign(hash_tx)
		return hashlib.sha256(bytearray(f"{self.from_address}{self.to_address}{self.amount}".encode('utf-8'))).hexdigest()

	def is_valid(self):
		"""  """
		if self.from_address is None:
			return True
		elif self.signature | len(self.signature) == 0:
			raise Exception("Transaction not signed.")
		else:
			public_key = VerifyingKey.from_pem(self.to_address())
			return public_key.verify(public_key, self.calculate_hash())

	def __str__(self):
		"""  """
		return f"""from={self.from_address}, to={self.to_address}, amount={self.amount}"""

class Block():
	"""A block in the blockchain"""
	nonce = 2

	def __init__(self, timestamp, transactions, previous_hash = ''):
		"""  """
		self.timestamp = timestamp
		self.transactions = transactions
		self.previous_hash = previous_hash
		self.hash = self.calculate_hash()
		self.nonce = 0
	
	def calculate_hash(self):
		"""  """
		return hashlib.sha256(bytearray(f"{self.timestamp}{[str(t) for t in self.transactions]}{self.previous_hash}{self.nonce}".encode('utf-8'))).hexdigest()

	def mine_block(self, difficulty):
		"""  """
		while self.hash[0: difficulty] != ('0' * difficulty):
			self.nonce += 1
			self.hash = self.calculate_hash()
		# 	print(f"trying: {self.hash}")
		# print(f"mined: {self.hash}")
		return hashlib.sha256(bytearray(f"{self.timestamp}{[str(t) for t in self.transactions]}{self.previous_hash}".encode('utf-8'))).hexdigest()

	def has_valid_transactions(self):
		"""  """
		for tx in self.transactions:
			if not tx.is_valid():
				return False
		return True

	def __str__(self):
		"""  """
		return f"""(hash = {self.hash}, timestamp = {self.timestamp}, transactions = {[str(t) for t in self.transactions]}, previous_hash = {self.previous_hash}, nonce = {self.nonce})"""

class Blockchain():

	def __init__(self):
		"""  """
		self.chain = [self.generate_genesis_block()]
		self.difficulty = 2
		self.pending_transactions = []
		self.mining_reward = 100

	def generate_genesis_block(self):
		"""  """
		import time
		# return Block(time.asctime(), "In the beginning", 0)
		return Block(time.asctime(), [Transaction(0, 0, 0)], 0)

	def latest_block(self):
		"""  """
		return self.chain[-1]

	# def add_block(self, block):
	# 	"""  """
	# 	block.previous_hash = self.latest_block().hash
	# 	block.mine_block(self.difficulty)
	# 	self.chain.append(block)
	
	def mine_pending_transactions(self, mining_reward_address):
		"""  """
		import time
		block = Block(time.asctime(), self.pending_transactions)
		block.mine_block(self.difficulty)
		print(f"block mined: {block}")
		self.chain.append(block)
		self.pending_transactions = [Transaction(None, mining_reward_address, self.mining_reward)]

	def add_transaction(self, transaction):
		"""  """
		try:
			VerifyingKey.from_pem(transaction.from_address)
			VerifyingKey.from_pem(transaction.to_address)
		except AssertionError:
			raise Exception("Invalid address.") 
		if not transaction.is_valid:
			raise Exception("Invalid transaction.") 
		self.pending_transactions.append(transaction)

	def get_address_balance(self, address):
		"""  """
		balance = 0
		for block in self.chain: 
			for trans in block.transactions: 
				if trans.from_address == address: 
					balance -= trans.amount
				elif trans.to_address == address: 
					balance += trans.amount
		return balance

	def valid_chain(self):
		"""  """
		for i in range(1, len(self.chain)): 
			cuBlock = self.chain[i]
			if cuBlock.calculate_hash() != cuBlock.hash:
				return False
			if cuBlock.previous_hash != self.chain[i-1].hash:
				return False
			if not cuBlock.has_valid_transactions():
				return False
		return True
	
	def __len__(self):
		"""  """
		return len(self.chain)

	def __str__(self):
		"""  """
		return f"""chain = {[str(b) for b in self.chain]}"""

blc = Blockchain()
# blc.add_block(Block(0, 15022, "God created the heavens and the earth", 2))

key1 = b''
privkey1 = b''

tx = Transaction(key1, key1, 10)
tx.sign_transacion(privkey1)

blc.add_transaction(tx)



blc.add_transaction(Transaction('@1', '@2', 10))
blc.add_transaction(Transaction('@2', '@1', 5))

print("start mining ...")

blc.mine_pending_transactions('@me')

print(f"my  balance = {blc.get_address_balance('@2')}")


# print(str(Blockchain().generate_genesis_block()))

# print(hashlib.sha256(b"textt").hexdigest())

from cryptography.hazmat.primitives.asymmetric import ec
from cryptography.hazmat.backends import default_backend
from cryptography.hazmat.primitives import hashes
private_key = ec.generate_private_key(
	ec.SECP384R1(), default_backend()
	)

data = b"this is some data I'd like to sign"
signature = private_key.sign(
    data,
	ec.ECDSA(hashes.SHA256())
	)

print(str(private_key.public_key().hexd()))


# https://github.com/warner/python-ecdsa#usage

from ecdsa import SigningKey, NIST384p
sk = SigningKey.generate(curve=NIST384p)  # uses NIST192p
vk = sk.get_verifying_key()
signature = sk.sign("message")
assert vk.verify(signature, "message")