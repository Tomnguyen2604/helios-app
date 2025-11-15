from transformers import GPT2LMHeadModel, GPT2Tokenizer, Trainer, TrainingArguments
from datasets import load_dataset
import torch

def finetune_model():
    """
    Fine-tune GPT-2 model on financial datasets from Hugging Face
    """
    print("Loading model and tokenizer...")
    model_name = "gpt2"
    tokenizer = GPT2Tokenizer.from_pretrained(model_name)
    model = GPT2LMHeadModel.from_pretrained(model_name)
    
    # Set pad token
    tokenizer.pad_token = tokenizer.eos_token
    model.config.pad_token_id = model.config.eos_token_id
    
    print("Loading financial dataset...")
    # Load financial news dataset
    dataset = load_dataset("zeroshot/twitter-financial-news-sentiment", split="train[:1000]")
    
    def tokenize_function(examples):
        return tokenizer(
            examples["text"],
            padding="max_length",
            truncation=True,
            max_length=128
        )
    
    print("Tokenizing dataset...")
    tokenized_dataset = dataset.map(tokenize_function, batched=True, remove_columns=dataset.column_names)
    tokenized_dataset = tokenized_dataset.add_column("labels", tokenized_dataset["input_ids"])
    
    print("Setting up training arguments...")
    training_args = TrainingArguments(
        output_dir="./finetuned_gpt2",
        num_train_epochs=3,
        per_device_train_batch_size=4,
        save_steps=500,
        save_total_limit=2,
        logging_steps=100,
        learning_rate=5e-5,
        warmup_steps=100,
        weight_decay=0.01,
    )
    
    print("Starting training...")
    trainer = Trainer(
        model=model,
        args=training_args,
        train_dataset=tokenized_dataset,
    )
    
    trainer.train()
    
    print("Saving fine-tuned model...")
    model.save_pretrained("./finetuned_gpt2")
    tokenizer.save_pretrained("./finetuned_gpt2")
    
    print("Fine-tuning complete!")

if __name__ == "__main__":
    finetune_model()
