# This is a file for mdl.

all

# I don't believe in these:
exclude_rule 'MD013' # Line length
exclude_rule 'MD014' # Dollar signs used before commands without showing output
exclude_rule 'MD026' # Trailing punctuation in header
exclude_rule 'MD029' # Ordered list item prefix
exclude_rule 'MD039' # Spaces inside link text

# These are incompatible with Jekyll:
exclude_rule 'MD002' # First header should be a top level header
exclude_rule 'MD041' # First line in file should be a top level header

# Not sure what to do about this. It's been helpful, but it currently
# reports a couple of false positives because it doesn't know about
# liquid tags.
exclude_rule 'MD034' # Bare URL used

# We do these on purpose. Comment them out to see where.
exclude_rule 'MD024' # Multiple headers with the same content
exclude_rule 'MD028' # Blank line inside blockquote
exclude_rule 'MD033' # Inline HTML

# MDL doesn't know enough about nested lists for these to be useful
exclude_rule 'MD004' # Unordered list style
exclude_rule 'MD005' # Inconsistent indentation for list items at the same level
exclude_rule 'MD006' # Consider starting bulleted lists at the beginning of the line
exclude_rule 'MD007' # Unordered list indentation
exclude_rule 'MD032' # Lists should be surrounded by blank lines

# Might tighten up these up later:
exclude_rule 'MD036' # Emphasis used instead of a header
