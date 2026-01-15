# CountRackula 🧛

Count Rackula - The Counting Vampire! A simple and elegant counting utility.

## Overview

Count Rackula is a Python package that provides a simple counter class for tracking and manipulating counts. Perfect for when you need to count things (like a vampire counts... counts!).

## Features

- Simple Counter class with increment/decrement operations
- Support for custom increment/decrement amounts
- Reset functionality
- Clean API with property access
- Command-line interface for demonstrations

## Installation

Install directly from the repository:

```bash
pip install -e .
```

## Usage

### As a Python Package

```python
from countrackula import Counter

# Create a counter
counter = Counter()

# Increment
counter.increment()  # count is now 1
counter.increment(5)  # count is now 6

# Decrement
counter.decrement(2)  # count is now 4

# Get current count
print(counter.count)  # prints: 4

# Reset
counter.reset()  # count is now 0
```

### As a CLI Tool

Run the demo:

```bash
python -m countrackula
```

Or if installed:

```bash
countrackula
```

## Development

### Project Structure

```
CountRackula/
├── countrackula/
│   ├── __init__.py       # Package initialization
│   ├── __main__.py       # CLI entry point
│   └── counter.py        # Core Counter class
├── pyproject.toml        # Package configuration
├── requirements.txt      # Dependencies
└── README.md            # This file
```

## License

MIT License

## Contributing

Contributions welcome! Please feel free to submit a Pull Request.
