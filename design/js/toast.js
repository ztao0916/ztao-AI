/**
 * 通用消息提示组件
 * 用于替代原生alert，提供更友好的用户体验
 */

// 创建Toast容器
function createToastContainer() {
    // 检查是否已存在Toast容器
    if (document.getElementById('toast-container')) {
        return;
    }
    
    // 创建Toast容器
    const toastContainer = document.createElement('div');
    toastContainer.id = 'toast-container';
    toastContainer.className = 'fixed top-4 right-4 z-50 flex flex-col items-end space-y-2';
    document.body.appendChild(toastContainer);
}

/**
 * 显示消息提示
 * @param {string} message - 提示消息
 * @param {string} type - 提示类型：'success', 'error', 'info', 'warning'
 * @param {number} duration - 显示时长(毫秒)，默认3000ms
 */
function showToast(message, type = 'info', duration = 3000) {
    // 确保Toast容器存在
    createToastContainer();
    
    // 根据类型设置样式
    let bgColor, textColor, icon;
    switch (type) {
        case 'success':
            bgColor = 'bg-green-500';
            textColor = 'text-white';
            icon = '<i class="fas fa-check-circle mr-2"></i>';
            break;
        case 'error':
            bgColor = 'bg-red-500';
            textColor = 'text-white';
            icon = '<i class="fas fa-exclamation-circle mr-2"></i>';
            break;
        case 'warning':
            bgColor = 'bg-yellow-500';
            textColor = 'text-white';
            icon = '<i class="fas fa-exclamation-triangle mr-2"></i>';
            break;
        case 'info':
        default:
            bgColor = 'bg-blue-500';
            textColor = 'text-white';
            icon = '<i class="fas fa-info-circle mr-2"></i>';
            break;
    }
    
    // 创建Toast元素
    const toast = document.createElement('div');
    toast.className = `${bgColor} ${textColor} px-4 py-3 rounded-md shadow-lg flex items-center transform transition-all duration-300 translate-x-full opacity-0`;
    toast.innerHTML = `
        ${icon}
        <span>${message}</span>
        <button class="ml-4 text-white hover:text-gray-200 focus:outline-none">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // 获取Toast容器并添加Toast
    const toastContainer = document.getElementById('toast-container');
    toastContainer.appendChild(toast);
    
    // 添加关闭按钮事件
    const closeButton = toast.querySelector('button');
    closeButton.addEventListener('click', () => {
        hideToast(toast);
    });
    
    // 显示动画
    setTimeout(() => {
        toast.classList.remove('translate-x-full', 'opacity-0');
    }, 10);
    
    // 自动关闭
    if (duration > 0) {
        setTimeout(() => {
            hideToast(toast);
        }, duration);
    }
    
    return toast;
}

/**
 * 隐藏消息提示
 * @param {HTMLElement} toast - Toast元素
 */
function hideToast(toast) {
    // 添加隐藏动画
    toast.classList.add('translate-x-full', 'opacity-0');
    
    // 动画结束后移除元素
    setTimeout(() => {
        if (toast.parentNode) {
            toast.parentNode.removeChild(toast);
        }
    }, 300);
}

// 快捷方法
const Toast = {
    success: (message, duration) => showToast(message, 'success', duration),
    error: (message, duration) => showToast(message, 'error', duration),
    warning: (message, duration) => showToast(message, 'warning', duration),
    info: (message, duration) => showToast(message, 'info', duration)
}; 