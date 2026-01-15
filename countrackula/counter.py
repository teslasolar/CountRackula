"""
Core counter functionality for Count Rackula
"""


class Counter:
    """A simple counter class for tracking counts"""
    
    def __init__(self, initial_value=0):
        """
        Initialize a counter with an optional initial value
        
        Args:
            initial_value (int): Starting value for the counter (default: 0)
        """
        self._count = initial_value
    
    @property
    def count(self):
        """Get the current count"""
        return self._count
    
    def increment(self, amount=1):
        """
        Increment the counter by the specified amount
        
        Args:
            amount (int): Amount to increment (default: 1)
        
        Returns:
            int: The new count value
        """
        self._count += amount
        return self._count
    
    def decrement(self, amount=1):
        """
        Decrement the counter by the specified amount
        
        Args:
            amount (int): Amount to decrement (default: 1)
        
        Returns:
            int: The new count value
        """
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
