from transformers import GPT2LMHeadModel, GPT2Tokenizer
import torch

def load_finetuned_model():
    """
    Load and test the fine-tuned GPT-2 model
    """
    print("Loading fine-tuned model...")
    model_path = "./finetuned_gpt2"
    
    try:
        tokenizer = GPT2Tokenizer.from_pretrained(model_path)
        model = GPT2LMHeadModel.from_pretrained(model_path)
        
        # Set pad token
        tokenizer.pad_token = tokenizer.eos_token
        model.config.pad_token_id = model.config.eos_token_id
        
        print("Model loaded successfully!")
        return model, tokenizer
    except Exception as e:
        print(f"Error loading model: {e}")
        print("Falling back to base GPT-2 model...")
        tokenizer = GPT2Tokenizer.from_pretrained("gpt2")
        model = GPT2LMHeadModel.from_pretrained("gpt2")
        tokenizer.pad_token = tokenizer.eos_token
        model.config.pad_token_id = model.config.eos_token_id
        return model, tokenizer

def generate_response(model, tokenizer, prompt):
    """
    Generate a response using the fine-tuned model
    """
    inputs = tokenizer.encode(prompt, return_tensors="pt")
    
    with torch.no_grad():
        outputs = model.generate(
            inputs,
            max_length=150,
            num_return_sequences=1,
            temperature=0.8,
            top_k=50,
            top_p=0.95,
            do_sample=True,
            pad_token_id=tokenizer.eos_token_id
        )
    
    response = tokenizer.decode(outputs[0], skip_special_tokens=True)
    return response

if __name__ == "__main__":
    model, tokenizer = load_finetuned_model()
    
    # Test prompts
    test_prompts = [
        "What is the outlook for tech stocks?",
        "Should I invest in cryptocurrency?",
        "How does inflation affect the stock market?",
        "What are the risks of investing in growth stocks?"
    ]
    
    print("\n" + "="*50)
    print("Testing Fine-Tuned Model")
    print("="*50 + "\n")
    
    for prompt in test_prompts:
        print(f"Prompt: {prompt}")
        response = generate_response(model, tokenizer, prompt)
        print(f"Response: {response}\n")
        print("-"*50 + "\n")
