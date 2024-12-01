import { useSpring, animated } from "@react-spring/web";
import { Parallax, ParallaxLayer, IParallax } from "@react-spring/parallax";
import "./App.css";
import { useEffect } from "react";

const App = () => {
  // スクロールに応じた横方向のアニメーション
  const [props, api] = useSpring(() => ({
    x: 0,
    config: { tension: 280, friction: 60 }, // アニメーションの速度調整
  }));

  // スクロール時のイベントリスナー
  const handleScroll = () => {
    const scrollPosition = window.scrollY; // 現在のスクロール位置

    const scrollWidth = window.innerWidth; // ビューポートの横幅
    api.start({ x: (-scrollPosition / scrollWidth) * 100 });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="container">
      {/* アニメーションさせる部分 */}
      <animated.div
        className="animated-box"
        style={{
          transform: props.x.to((x) => `translateX(${x}%)`),
        }}
      >
        <div className="content">Your Content Here</div>
      </animated.div>
      <div className="spacer"></div>
    </div>
  );
};

export default App;
