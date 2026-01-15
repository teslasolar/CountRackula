"""
Main entry point for Count Rackula CLI
"""

import sys
from .counter import Counter


def main():
    """Main CLI function"""
    print("🧛 Count Rackula - The Counting Vampire 🧛")
    print("=" * 40)
    
    counter = Counter()
    print(f"Starting count: {counter.count}")
    
    # Example usage
    counter.increment()
    print(f"After increment: {counter.count}")
    
    counter.increment(5)
    print(f"After increment by 5: {counter.count}")
    
    counter.decrement(2)
    print(f"After decrement by 2: {counter.count}")
    
    print(f"\nFinal counter state: {counter}")
    
    return 0


if __name__ == "__main__":
    sys.exit(main())
