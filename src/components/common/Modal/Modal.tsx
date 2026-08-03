import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

/** 内部 ClassName 合并辅助函数 */
function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

export interface ModalProps {
  /** 控制 Modal 是否打开 (默认为 true) */
  isOpen?: boolean;
  /** 关闭 Modal 的回调函数 (点击红色按钮、点击遮罩外部、按下 ESC 时触发) */
  onClose?: () => void;
  /** 点击 modal 外部遮罩区域时是否自动关闭 (默认为 true) */
  closeOnOutsideClick?: boolean;
  /** 按下 ESC 键时是否自动关闭 (默认为 true) */
  closeOnEsc?: boolean;
  /** Header 左侧标题 (支持 string 或 ReactNode) */
  title?: React.ReactNode;
  /** Header 右侧 slot 扩展区 (支持任意 ReactNode，例如状态灯、按钮等) */
  headerRight?: React.ReactNode;
  /** Footer 区域 */
  footer?: React.ReactNode;
  /** Modal 内容区 */
  children?: React.ReactNode;
  /** Modal 最大宽度 Tailwind 类名 (默认为 'max-w-4xl') */
  maxWidth?: string;
  /** Modal 容器自定义 class */
  className?: string;
  /** 背景 Overlay 遮罩层自定义 class */
  overlayClassName?: string;
  /** 是否显示左侧 macOS 红黄绿三点 controls (默认为 true) */
  showControls?: boolean;
  /** 是否以 Modal 弹窗模式渲染 (为 false 时作为嵌入卡片容器渲染，默认为 true) */
  isModal?: boolean;
  /** ARIA 窗口描述，用于无障碍朗读 */
  ariaLabel?: string;
}

export const ModalComponent: React.FC<ModalProps> = ({
  isOpen = true,
  onClose,
  closeOnOutsideClick = true,
  closeOnEsc = true,
  title,
  headerRight,
  footer,
  children,
  maxWidth = 'max-w-4xl',
  className = '',
  overlayClassName = '',
  showControls = true,
  isModal = true,
  ariaLabel,
}) => {
  const overlayRef = useRef<HTMLDivElement>(null);

  // 监听 ESC 键关闭 Modal
  useEffect(() => {
    if (!isOpen || !closeOnEsc || !onClose) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeOnEsc, onClose]);

  // Modal 打开时锁定页面 body 滚动
  useEffect(() => {
    if (!isModal || !isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, isModal]);

  if (!isOpen) return null;

  // 点击遮罩外部关闭 Modal (增加 target 严格校验，防止内部拖选文本误触发)
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (closeOnOutsideClick && e.target === overlayRef.current) {
      onClose?.();
    }
  };

  const modalContent = (
    <div
      role={isModal ? 'dialog' : undefined}
      aria-modal={isModal ? true : undefined}
      aria-label={ariaLabel || (typeof title === 'string' ? title : 'Modal')}
      className={cn(
        'w-full mx-auto rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl border border-slate-800 bg-[#0b1322] text-slate-100 transition-all duration-200',
        maxWidth,
        className
      )}
    >
      {/* Header 区域 */}
      {(title || headerRight || showControls) && (
        <div className="flex items-center justify-between px-3.5 sm:px-6 py-2.5 sm:py-3 border-b border-slate-800/80">
          <div className="flex items-center space-x-2.5 sm:space-x-3 truncate">
            {showControls && (
              <div className="flex items-center space-x-1.5 sm:space-x-2 shrink-0">
                <button
                  type="button"
                  onClick={() => onClose?.()}
                  aria-label="关闭"
                  title="关闭"
                  className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#ff5f56] hover:bg-[#e0443e] flex items-center justify-center transition-colors shadow-sm cursor-pointer group focus:outline-none focus:ring-1 focus:ring-red-400/50"
                >
                  <svg
                    className="w-1.5 h-1.5 sm:w-2 sm:h-2 text-[#4c0000] opacity-0 group-hover:opacity-100 transition-opacity"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#ffbd2e] inline-block shadow-sm" />
                <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#27c93f] inline-block shadow-sm" />
              </div>
            )}

            {title && (
              <div className="ml-1 sm:ml-2 text-xs sm:text-sm font-medium text-slate-300 tracking-wide truncate">
                {title}
              </div>
            )}
          </div>

          {headerRight && (
            <div className="flex items-center space-x-2 sm:space-x-4 shrink-0">
              {headerRight}
            </div>
          )}
        </div>
      )}

      {/* Body 内容区 */}
      <div className="relative">{children}</div>

      {/* Footer 区域 */}
      {Boolean(footer) && (
        <div className="py-2 sm:py-2.5 px-4 text-center border-t border-slate-800/40 bg-slate-900/20">
          {typeof footer === 'string' ? (
            <span className="text-xs text-slate-400 font-medium tracking-wide">
              {footer}
            </span>
          ) : (
            footer
          )}
        </div>
      )}
    </div>
  );

  if (!isModal) {
    return modalContent;
  }

  const portalTarget = typeof document !== 'undefined' ? document.body : null;
  if (!portalTarget) return null;

  return createPortal(
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className={cn(
        'fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-sm overflow-y-auto',
        overlayClassName
      )}
    >
      {modalContent}
    </div>,
    portalTarget
  );
};

/* ─── 架构扩展：支持复合组件模式 (Compound Components) ─── */

export interface ModalHeaderProps {
  children?: React.ReactNode;
  className?: string;
}

export const ModalHeader: React.FC<ModalHeaderProps> = ({ children, className = '' }) => (
  <div className={cn('flex items-center justify-between px-3.5 sm:px-6 py-2.5 sm:py-3 border-b border-slate-800/80', className)}>
    {children}
  </div>
);

export interface ModalBodyProps {
  children?: React.ReactNode;
  className?: string;
}

export const ModalBody: React.FC<ModalBodyProps> = ({ children, className = '' }) => (
  <div className={cn('relative p-4 sm:p-6', className)}>{children}</div>
);

export interface ModalFooterProps {
  children?: React.ReactNode;
  className?: string;
}

export const ModalFooter: React.FC<ModalFooterProps> = ({ children, className = '' }) => (
  <div className={cn('py-2 sm:py-2.5 px-4 text-center border-t border-slate-800/40 bg-slate-900/20', className)}>
    {children}
  </div>
);

/** 结合复合组件与标准组件的 Modal 最终导出 */
export const Modal = Object.assign(ModalComponent, {
  Header: ModalHeader,
  Body: ModalBody,
  Footer: ModalFooter,
});
