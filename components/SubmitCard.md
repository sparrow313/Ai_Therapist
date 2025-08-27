# SubmitCard Component

A sleek, reusable custom submit card component that replaces native Alert dialogs with a modern, animated UI that matches your app's design system.

## Features

- 🎨 **Modern Design**: Sleek card design with blur background and smooth animations
- 🎭 **Multiple Types**: Success, Error, Warning, and Info variants with appropriate colors
- ⚡ **Smooth Animations**: Entrance/exit animations with pulse effects for emojis
- 🔧 **Highly Customizable**: Custom emojis, auto-close, action buttons, and more
- 🎯 **Easy Integration**: Simple hook-based API with predefined presets
- 📱 **Responsive**: Adapts to different screen sizes and orientations

## Installation

The component is already set up in your project. You just need to import it:

```tsx
import SubmitCard from '@/components/SubmitCard';
import { useSubmitCard, SUBMIT_CARD_PRESETS } from '@/hooks/useSubmitCard';
```

## Basic Usage

### 1. Using the Hook

```tsx
import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { useSubmitCard } from '@/hooks/useSubmitCard';

const MyComponent = () => {
  const {
    isVisible: submitCardVisible,
    config: submitCardConfig,
    hideSubmitCard,
    showSuccess,
    showError,
    showWarning,
    showInfo,
  } = useSubmitCard();

  const handleSuccess = () => {
    showSuccess("Success!", "Your action was completed successfully.");
  };

  return (
    <>
      <TouchableOpacity onPress={handleSuccess}>
        <Text>Show Success</Text>
      </TouchableOpacity>

      {submitCardConfig && (
        <SubmitCard
          visible={submitCardVisible}
          type={submitCardConfig.type}
          title={submitCardConfig.title}
          message={submitCardConfig.message}
          onClose={hideSubmitCard}
          onAction={submitCardConfig.onAction}
          actionText={submitCardConfig.actionText}
          autoClose={submitCardConfig.autoClose}
          autoCloseDelay={submitCardConfig.autoCloseDelay}
          emoji={submitCardConfig.emoji}
        />
      )}
    </>
  );
};
```

### 2. Quick Methods

```tsx
// Success with auto-close
showSuccess("Success!", "Your mood has been logged!");

// Error with retry action
showError("Error", "Failed to save data", {
  actionText: "Retry",
  onAction: () => {
    // Retry logic here
    hideSubmitCard();
  }
});

// Warning with confirmation
showWarning("Warning", "This action cannot be undone", {
  actionText: "Continue",
  onAction: () => {
    // Proceed with action
    hideSubmitCard();
  }
});

// Info message
showInfo("Info", "Here's some important information");
```

### 3. Using Predefined Presets

```tsx
import { SUBMIT_CARD_PRESETS } from '@/hooks/useSubmitCard';

// Mood logged success
showSuccess(
  SUBMIT_CARD_PRESETS.MOOD_LOGGED.title,
  SUBMIT_CARD_PRESETS.MOOD_LOGGED.message,
  { emoji: "😊" }
);

// Pledge taken success
showSuccess(
  SUBMIT_CARD_PRESETS.PLEDGE_TAKEN.title,
  SUBMIT_CARD_PRESETS.PLEDGE_TAKEN.message,
  { emoji: SUBMIT_CARD_PRESETS.PLEDGE_TAKEN.emoji }
);

// Already logged warning
showWarning(
  SUBMIT_CARD_PRESETS.ALREADY_LOGGED.title,
  SUBMIT_CARD_PRESETS.ALREADY_LOGGED.message
);
```

## Available Presets

- `MOOD_LOGGED`: Success message for mood logging
- `PLEDGE_TAKEN`: Success message for pledge completion
- `ALREADY_LOGGED`: Warning for duplicate entries
- `SAVE_ERROR`: Error message for save failures
- `LOGIN_REQUIRED`: Warning for authentication required
- `DATA_REFRESHED`: Info message for data updates

## Props

### SubmitCard Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `visible` | `boolean` | - | Controls modal visibility |
| `type` | `'success' \| 'error' \| 'warning' \| 'info'` | - | Card type (affects colors) |
| `title` | `string` | - | Main title text |
| `message` | `string` | - | Description message |
| `onClose` | `() => void` | - | Close callback |
| `onAction` | `() => void` | `undefined` | Action button callback |
| `actionText` | `string` | `undefined` | Action button text |
| `autoClose` | `boolean` | `false` | Auto-close after delay |
| `autoCloseDelay` | `number` | `3000` | Auto-close delay in ms |
| `emoji` | `string` | `undefined` | Custom emoji (overrides type default) |

### Hook Return Values

| Property | Type | Description |
|----------|------|-------------|
| `isVisible` | `boolean` | Current visibility state |
| `config` | `SubmitCardConfig \| null` | Current card configuration |
| `showSubmitCard` | `(config) => void` | Show card with custom config |
| `hideSubmitCard` | `() => void` | Hide the card |
| `showSuccess` | `(title, message, options?) => void` | Show success card |
| `showError` | `(title, message, options?) => void` | Show error card |
| `showWarning` | `(title, message, options?) => void` | Show warning card |
| `showInfo` | `(title, message, options?) => void` | Show info card |

## Migration from Alert

### Before (using Alert)
```tsx
Alert.alert("Success", "Your mood has been logged!");
Alert.alert("Error", "Failed to save data");
```

### After (using SubmitCard)
```tsx
showSuccess("Success", "Your mood has been logged!");
showError("Error", "Failed to save data");
```

## Customization

### Custom Colors
The component automatically uses colors from your `Colors` constants:
- Success: `Colors.status.success`
- Error: `Colors.status.error`
- Warning: `Colors.status.warning`
- Info: `Colors.status.info`

### Custom Animations
Animations are built-in but can be customized by modifying the component's animation values.

## Examples

See `SubmitCardExample.tsx` for a complete example showing all features and usage patterns.

## Best Practices

1. **Use appropriate types**: Match the card type to the message context
2. **Keep messages concise**: Short, clear messages work best
3. **Use presets when possible**: Leverage predefined configurations for consistency
4. **Handle actions properly**: Always call `hideSubmitCard()` in action callbacks
5. **Auto-close for success**: Use auto-close for positive feedback messages
6. **Manual close for errors**: Let users manually dismiss error messages
