import { useState } from 'react';
import { Accessibility } from 'lucide-react';
import { useAccessibilityStore } from '../../stores/accessibilityStore';
import type { ContrastMode, FontSize } from '../../types';

export function AccessibilityPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const { contrastMode, fontSize, setContrastMode, setFontSize } =
    useAccessibilityStore();

  const contrastOptions: { value: ContrastMode; label: string }[] = [
    { value: 'normal', label: 'Standard' },
    { value: 'dark', label: 'Ciemny' },
    { value: 'high-contrast', label: 'Kontrast' },
  ];

  const fontOptions: { value: FontSize; label: string }[] = [
    { value: 'normal', label: 'A' },
    { value: 'large', label: 'A+' },
    { value: 'x-large', label: 'A++' },
  ];

  // Kolory zależne od trybu
  const isDark = contrastMode === 'dark';
  const isHighContrast = contrastMode === 'high-contrast';

  const panelBg = isHighContrast ? '#000000' : isDark ? '#1f1f1f' : '#ffffff';
  const panelBorder = isHighContrast ? '#ffffff' : isDark ? '#404040' : '#e5e5e5';
  const textColor = isHighContrast ? '#ffffff' : isDark ? '#f5f5f5' : '#1a1a1a';
  const mutedColor = isHighContrast ? '#cccccc' : isDark ? '#a3a3a3' : '#666666';

  const btnActiveBg = isHighContrast ? '#ffff00' : isDark ? '#ffffff' : '#1a1a1a';
  const btnActiveText = isHighContrast ? '#000000' : isDark ? '#1a1a1a' : '#ffffff';
  const btnActiveBorder = isHighContrast ? '#ffff00' : isDark ? '#ffffff' : '#1a1a1a';

  const btnInactiveBg = isHighContrast ? '#000000' : isDark ? '#2a2a2a' : '#ffffff';
  const btnInactiveText = isHighContrast ? '#ffffff' : isDark ? '#f5f5f5' : '#1a1a1a';
  const btnInactiveBorder = isHighContrast ? '#ffffff' : isDark ? '#525252' : '#d4d4d4';

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg border border-transparent hover:border-current"
        aria-label="Ustawienia dostępności"
        aria-expanded={isOpen}
        aria-haspopup="dialog"
      >
        <Accessibility size={24} aria-hidden="true" />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          <div
            role="dialog"
            aria-label="Panel dostępności"
            style={{
              position: 'absolute',
              right: 0,
              top: '100%',
              marginTop: '8px',
              width: '280px',
              padding: '16px',
              borderRadius: '8px',
              zIndex: 50,
              backgroundColor: panelBg,
              border: `2px solid ${panelBorder}`,
              boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
            }}
          >
            <h3 style={{
              margin: '0 0 16px 0',
              fontSize: '16px',
              fontWeight: 600,
              color: textColor,
            }}>
              Dostępność
            </h3>

            {/* Contrast Mode */}
            <div style={{ marginBottom: '16px' }}>
              <p style={{
                margin: '0 0 8px 0',
                fontSize: '14px',
                color: mutedColor,
              }}>
                Tryb kolorów
              </p>
              <div style={{ display: 'flex', gap: '8px' }}>
                {contrastOptions.map((option) => {
                  const isActive = contrastMode === option.value;
                  return (
                    <button
                      key={option.value}
                      onClick={() => setContrastMode(option.value)}
                      style={{
                        flex: 1,
                        padding: '8px 4px',
                        fontSize: '13px',
                        fontWeight: 500,
                        borderRadius: '6px',
                        border: '2px solid',
                        cursor: 'pointer',
                        backgroundColor: isActive ? btnActiveBg : btnInactiveBg,
                        color: isActive ? btnActiveText : btnInactiveText,
                        borderColor: isActive ? btnActiveBorder : btnInactiveBorder,
                      }}
                      aria-pressed={isActive}
                    >
                      {option.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Font Size */}
            <div>
              <p style={{
                margin: '0 0 8px 0',
                fontSize: '14px',
                color: mutedColor,
              }}>
                Rozmiar czcionki
              </p>
              <div style={{ display: 'flex', gap: '8px' }}>
                {fontOptions.map((option) => {
                  const isActive = fontSize === option.value;
                  return (
                    <button
                      key={option.value}
                      onClick={() => setFontSize(option.value)}
                      style={{
                        flex: 1,
                        padding: '8px 4px',
                        fontSize: option.value === 'x-large' ? '18px' : option.value === 'large' ? '16px' : '14px',
                        fontWeight: 600,
                        borderRadius: '6px',
                        border: '2px solid',
                        cursor: 'pointer',
                        backgroundColor: isActive ? btnActiveBg : btnInactiveBg,
                        color: isActive ? btnActiveText : btnInactiveText,
                        borderColor: isActive ? btnActiveBorder : btnInactiveBorder,
                      }}
                      aria-pressed={isActive}
                      aria-label={`Rozmiar czcionki: ${option.label}`}
                    >
                      {option.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
