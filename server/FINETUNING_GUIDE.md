# GPT-2 Fine-Tuning Guide for Helios

## Overview
This guide explains how to fine-tune the GPT-2 model on financial datasets to improve the AI assistant's responses in the Helios dashboard.

## Prerequisites
- Python 3.8+
- PyTorch
- Transformers library
- Datasets library
- At least 8GB RAM (16GB recommended)
- GPU (optional but recommended for faster training)

## Installation

Install required packages:
```bash
pip install transformers datasets torch
```

## Fine-Tuning Process

### 1. Run the Fine-Tuning Script
```bash
python finetune.py
```

This script will:
- Load the base GPT-2 model
- Download financial news dataset from Hugging Face
- Tokenize the dataset
- Train the model for 3 epochs
- Save the fine-tuned model to `./finetuned_gpt2`

### 2. Training Parameters
- **Epochs**: 3
- **Batch Size**: 4
- **Learning Rate**: 5e-5
- **Max Length**: 128 tokens
- **Dataset**: Twitter Financial News Sentiment (1000 samples)

### 3. Expected Training Time
- CPU: 2-4 hours
- GPU: 15-30 minutes

## Using the Fine-Tuned Model

### Option 1: Update ai.py
Replace the model loading in `ai.py`:
```python
model_name = "./finetuned_gpt2"  # Instead of "gpt2"
```

### Option 2: Use the Separate Script
```bash
python use_finetuned_model.py
```

## Customization

### Use Different Dataset
Replace the dataset in `finetune.py`:
```python
dataset = load_dataset("your-dataset-name", split="train")
```

### Adjust Training Parameters
Modify in `finetune.py`:
```python
training_args = TrainingArguments(
    num_train_epochs=5,  # More epochs
    per_device_train_batch_size=8,  # Larger batch
    learning_rate=3e-5,  # Different learning rate
)
```

### Generation Parameters
Adjust in `ai.py`:
```python
output = model.generate(
    input_ids,
    max_length=100,  # Longer responses
    temperature=0.7,  # More creative (higher) or focused (lower)
    top_k=50,  # Diversity
    top_p=0.95,  # Nucleus sampling
)
```

## Troubleshooting

### Out of Memory
- Reduce batch size: `per_device_train_batch_size=2`
- Reduce max length: `max_length=64`
- Use gradient accumulation

### Poor Quality Responses
- Train for more epochs
- Use larger dataset
- Adjust temperature and sampling parameters
- Add more diverse training data

### Model Not Loading
- Check path: `./finetuned_gpt2`
- Ensure both model and tokenizer are saved
- Verify file permissions

## Best Practices

1. **Start Small**: Test with small dataset first
2. **Monitor Loss**: Check training logs for decreasing loss
3. **Validate**: Test responses before deploying
4. **Backup**: Keep original model as fallback
5. **Iterate**: Fine-tune parameters based on results

## Alternative Datasets

Financial datasets on Hugging Face:
- `zeroshot/twitter-financial-news-sentiment`
- `financial_phrasebank`
- `reuters21578`
- `stock-market-tweets`

## Performance Tips

1. Use GPU if available
2. Enable mixed precision training
3. Use gradient checkpointing for large models
4. Batch process training data
5. Cache tokenized datasets

## Next Steps

After fine-tuning:
1. Test the model with various financial queries
2. Compare responses with base model
3. Adjust generation parameters
4. Consider additional fine-tuning rounds
5. Deploy to production

## Resources

- [Hugging Face Transformers](https://huggingface.co/docs/transformers)
- [GPT-2 Documentation](https://huggingface.co/gpt2)
- [Fine-Tuning Guide](https://huggingface.co/docs/transformers/training)
- [Datasets Library](https://huggingface.co/docs/datasets)
