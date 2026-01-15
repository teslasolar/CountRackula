"""
Core counter functionality for Count Rackula
"""


class Counter:
    """A simple counter class for tracking counts"""
    
    def __init__(self, initial_value=0):
        """
        Initialize a counter with an optional initial value
        
        Args:
            initial_value (int or float): Starting value for the counter (default: 0)
        
        Raises:
            TypeError: If initial_value is not a number
        """
        if not isinstance(initial_value, (int, float)):
            raise TypeError(f"initial_value must be a number, got {type(initial_value).__name__}")
        self._count = initial_value
    
    @property
    def count(self):
        """Get the current count"""
        return self._count
    
    def increment(self, amount=1):
        """
        Increment the counter by the specified amount
        
        Args:
            amount (int or float): Amount to increment (default: 1)
        
        Returns:
            int or float: The new count value
        
        Raises:
            TypeError: If amount is not a number
        """
        if not isinstance(amount, (int, float)):
            raise TypeError(f"amount must be a number, got {type(amount).__name__}")
        self._count += amount
        return self._count
    
    def decrement(self, amount=1):
        """
        Decrement the counter by the specified amount
        
        Args:
            amount (int or float): Amount to decrement (default: 1)
        
        Returns:
            int or float: The new count value
        
        Raises:
            TypeError: If amount is not a number
        """
        if not isinstance(amount, (int, float)):
            raise TypeError(f"amount must be a number, got {type(amount).__name__}")
        self._count -= amount
        return self._count
    
    def reset(self):
        """Reset the counter to zero"""
        self._count = 0
        return self._count
    
    def __str__(self):
        """String representation of the counter"""
        return f"Counter(count={self._count})"
    
    def __repr__(self):
        """Representation of the counter"""
        return f"Counter({self._count})"
