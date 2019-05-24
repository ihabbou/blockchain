import hashlib

class Block():
	"""A block in the blockchain"""
	nonce = 2

	def __init__(self, index, timestamp, data, previous_hash = ''):
		"""  """
		self.index = index
		self.timestamp = timestamp
		self.data = data
		self.previous_hash = previous_hash
		self.hash = self.calculate_hash()
		self.nonce = 0
	
	def calculate_hash(self):
		"""  """
		return hashlib.sha256(bytearray(f"{self.index}{self.timestamp}{self.data}{self.previous_hash}{self.nonce}".encode('utf-8'))).hexdigest()

	def mine_block(self, difficulty):
		"""  """
		while self.hash[0: difficulty] != ('0' * difficulty):
			self.nonce += 1
			self.hash = self.calculate_hash()
			print(f"trying: {self.hash}")
		print(f"mined: {self.hash}")
		return hashlib.sha256(bytearray(f"{self.index}{self.timestamp}{self.data}{self.previous_hash}".encode('utf-8'))).hexdigest()

	def __str__(self):
		"""  """
		return f"""(index = {self.index}, hash = {self.hash}, timestamp = {self.timestamp}, data = {self.data}, previous_hash = {self.previous_hash}, nonce = {self.nonce})"""

class Blockchain():

	def __init__(self):
		"""  """
		self.chain = [self.generate_genesis_block()]
		self.difficulty = 2

	def generate_genesis_block(self):
		"""  """
		import time
		return Block(0, time.asctime(), "In the beginning", 0)

	def latest_block(self):
		"""  """
		return self.chain[-1]

	def add_block(self, block):
		"""  """
		block.previous_hash = self.latest_block().hash
		block.mine_block(self.difficulty)
		self.chain.append(block)

	def valid_chain(self):
		"""  """
		for i in range(1, len(self.chain)): 
			if self.chain[i].calculate_hash() != self.chain[i].hash:
				return False
			if self.chain[i].previous_hash != self.chain[i-1].hash:
				return False
		return True

	
	def __len__(self):
		"""  """
		return len(self.chain)

	def __str__(self):
		"""  """
		return f"""chain = {[str(b) for b in self.chain]}"""

blc = Blockchain()
blc.add_block(Block(0, 15022, "God created the heavens and the earth", 2))

print(str(Blockchain().generate_genesis_block()))

print(hashlib.sha256(b"textt").hexdigest())


