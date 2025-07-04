import { BaseComponentProps } from './common';

// 버튼 관련 타입
export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends BaseComponentProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
}

// 입력 필드 관련 타입
export type InputType = 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search';

export interface InputProps extends BaseComponentProps {
  type?: InputType;
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  error?: string;
  label?: string;
  onChange?: (value: string) => void;
}

// 모달 관련 타입
export interface ModalProps extends BaseComponentProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  closable?: boolean;
}

// 알림 관련 타입
export type NotificationType = 'success' | 'error' | 'warning' | 'info';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message?: string;
  duration?: number;
  persistent?: boolean;
}

// 로딩 관련 타입
export type LoadingSize = 'sm' | 'md' | 'lg';
export type LoadingColor = 'primary' | 'secondary' | 'white';

export interface LoadingSpinnerProps extends BaseComponentProps {
  size?: LoadingSize;
  color?: LoadingColor;
}

// 에러 메시지 관련 타입
export interface ErrorMessageProps extends BaseComponentProps {
  title: string;
  message: string;
  onRetry?: () => void;
  showRetry?: boolean;
}

// 드롭다운 관련 타입
export interface DropdownItem {
  id: string;
  label: string;
  value: any;
  disabled?: boolean;
  icon?: React.ReactNode;
}

export interface DropdownProps extends BaseComponentProps {
  items: DropdownItem[];
  value?: any;
  placeholder?: string;
  onChange?: (value: any) => void;
  disabled?: boolean;
  searchable?: boolean;
}

// 태그 관련 타입
export interface TagProps extends BaseComponentProps {
  label: string;
  removable?: boolean;
  onRemove?: () => void;
  color?: string;
}

// 카드 관련 타입
export interface CardProps extends BaseComponentProps {
  title?: string;
  subtitle?: string;
  image?: string;
  actions?: React.ReactNode;
  clickable?: boolean;
  onClick?: () => void;
}

// 포스트 액션 관련 타입
export interface PostActionsProps extends BaseComponentProps {
  postId: string;
  variant?: 'default' | 'compact' | 'minimal';
}

// 삭제 버튼 관련 타입
export interface DeleteButtonProps extends BaseComponentProps {
  postId: string;
  variant?: 'default' | 'compact' | 'button';
  onDelete?: (postId: string) => void;
  showConfirm?: boolean;
  disabled?: boolean;
}

// 프로필 카드 관련 타입
export interface ProfileCardProps extends BaseComponentProps {
  variant?: 'default' | 'compact' | 'minimal';
  showBackground?: boolean;
  showContactInfo?: boolean;
}