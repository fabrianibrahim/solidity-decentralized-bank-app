# Write your contract deployment script here.
from brownie import Bank, accounts
import os

def main():
    
    bank = Bank.deploy({'from': accounts[0]})
  
    f = open("/usercode/bank_app/scripts/app/api/.env", "w")
    f.write("BANK_ADDRESS=" + str(bank))
    f.close()