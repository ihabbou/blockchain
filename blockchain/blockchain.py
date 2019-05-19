import hashlib

class Block():

	def __init__(self, index, timestamp, data, previous_hash = ''):
		"""  """
		self.index = index
		self.timestamp = timestamp
		self.data = data
		self.previous_hash = previous_hash
		self.hash = self.calculate_hash()
		
	
	def calculate_hash(self):
		"""  """
		return hashlib.sha256(bytearray(f"{self.index}{self.timestamp}{self.data}{self.previous_hash}".encode('utf-8'))).hexdigest()

	def __str__(self):
		"""  """
		return f"""index = {self.index}, timestamp = {self.timestamp}, data = {self.data}, previous_hash = {self.previous_hash}"""

class Blockchain():

	def __init__(self):
		"""  """
		self.chain = [self.generate_genesis_block()]

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
		block.hash = block.calculate_hash()
		self.chain.append(block)

	def __str__(self):
		"""  """
		return f"""chain = {self.chain}"""

blc = Blockchain()
blc.add_block(Block(0, 15022, "God created the heavens and the earth", 2))

print(str(Blockchain().generate_genesis_block()))

print(hashlib.sha256(b"textt").hexdigest())


