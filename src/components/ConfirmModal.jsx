import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

/**
 * ConfirmModal – overlay modal for confirm/cancel actions.
 * Props: open, onClose, onConfirm, title, message, confirmLabel, cancelLabel, variant ('danger' | 'primary'), loading.
 * - Clicking backdrop or Cancel calls onClose.
 * - Confirm button calls onConfirm (e.g. async); optional loading disables buttons.
 */
function ConfirmModal({
  open,
  onClose,
  onConfirm,
  title = 'Confirm',
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  variant = 'primary',
  loading = false,
}) {
  useEffect(() => {
    if (!open) return;
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;

  const isDanger = variant === 'danger';
  const confirmClass = isDanger
    ? 'bg-red-600 text-white hover:bg-red-500 border-red-700 shadow-red-900/20'
    : 'bg-blue-600 text-white hover:bg-blue-500 border-blue-700 shadow-blue-900/20';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-modal-title"
    >
      <div
        className="absolute inset-0 bg-zinc-950/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="relative w-full max-w-md rounded-xl border border-zinc-700/80 bg-zinc-900 shadow-xl ring-1 ring-zinc-800/50 p-5">
        <h2 id="confirm-modal-title" className="text-lg font-semibold text-zinc-50">
          {title}
        </h2>
        {message && (
          <p className="mt-3 text-base text-zinc-400">
            {message}
          </p>
        )}
        <div className="mt-5 flex flex-wrap gap-3 justify-end">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="min-h-[44px] cursor-pointer rounded-xl border border-zinc-600 bg-zinc-800 px-4 py-2.5 text-base font-medium text-zinc-200 hover:bg-zinc-700 disabled:opacity-50 transition-colors"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className={`min-h-[44px] cursor-pointer rounded-xl border px-4 py-2.5 text-base font-medium shadow-sm transition-colors disabled:opacity-50 ${confirmClass}`}
          >
            {loading ? 'Please wait...' : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

ConfirmModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  title: PropTypes.string,
  message: PropTypes.string,
  confirmLabel: PropTypes.string,
  cancelLabel: PropTypes.string,
  variant: PropTypes.oneOf(['primary', 'danger']),
  loading: PropTypes.bool,
};

export default ConfirmModal;
