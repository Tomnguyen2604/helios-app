from transformers import AutoTokenizer, AutoModelForCausalLM
import torch

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
tokenizer = AutoTokenizer.from_pretrained("moonshotai/Kimi-K2-Thinking", trust_remote_code=True)
model = AutoModelForCausalLM.from_pretrained("moonshotai/Kimi-K2-Thinking", trust_remote_code=True).to(device)

def generate_response(prompt):
    inputs = tokenizer.encode(prompt, return_tensors="pt").to(device)
    outputs = model.generate(inputs, max_length=100, pad_token_id=tokenizer.eos_token_id)
    return tokenizer.decode(outputs[0], skip_special_tokens=True)