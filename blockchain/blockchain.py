import hashlib

class Transaction():
	def __init__(self, from_address, to_address, amount):
		"""  """
		self.from_address = from_address
		self.to_address = to_address
		self.amount = amount

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
		return hashlib.sha256(bytearray(f"{self.timestamp}{self.transactions}{self.previous_hash}{self.nonce}".encode('utf-8'))).hexdigest()

	def mine_block(self, difficulty):
		"""  """
		while self.hash[0: difficulty] != ('0' * difficulty):
			self.nonce += 1
			self.hash = self.calculate_hash()
		# 	print(f"trying: {self.hash}")
		# print(f"mined: {self.hash}")
		return hashlib.sha256(bytearray(f"{self.timestamp}{[str(t) for t in self.transactions]}{self.previous_hash}".encode('utf-8'))).hexdigest()

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

	def create_transaction(self, transaction):
		"""  """
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
# blc.add_block(Block(0, 15022, "God created the heavens and the earth", 2))

blc.create_transaction(Transaction('@1', '@2', 10))
blc.create_transaction(Transaction('@2', '@1', 5))

print("start mining ...")

blc.mine_pending_transactions('@me')

print(f"my  balance = {blc.get_address_balance('@2')}")


# print(str(Blockchain().generate_genesis_block()))

# print(hashlib.sha256(b"textt").hexdigest())


