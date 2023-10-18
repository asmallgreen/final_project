import { useState, useEffect } from 'react';
import { BsHeartArrow } from 'react-icons/bs';

const MouseIcon = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [arrowAngle, setArrowAngle] = useState(0);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    let timeoutId;
    const delay = 500; // 延迟时间，单位毫秒

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;

      if (!isFollowing) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          setIsFollowing(true);
        }, delay);
      }

      const newX = clientX + 20; // 调整X坐标来放在右侧
      const newY = clientY + 20; // 调整Y坐标来放在下方
      setPosition({ x: newX, y: newY });

      // 计算箭头部分的旋转角度
      const deltaX = newX - position.x;
      const deltaY = newY - position.y;
      const angle = (Math.atan2(deltaY, deltaX) * 180) / Math.PI;
      setArrowAngle(angle);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(timeoutId);
    };
  }, [position.x, position.y, isFollowing]);

  return (
    <div
      style={{
        position: 'fixed',
        left: position.x + 'px',
        top: position.y + 'px',
        transition: 'transform 0.2s ease',
      }}
    >
      {/* 在这里放置你想要显示的图标 */}
      <BsHeartArrow />    </div>
  );
};

export default MouseIcon;