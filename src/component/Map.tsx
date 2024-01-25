/* global kakao */

declare global {
  interface Window {
    kakao: any;
  }
}

import Script from "next/script";

export default function Map() {
  const loadKakaoMap = () => {
    window.kakao.maps.load(() => {
      const mapContainer = document.getElementById("map");
      const mapOption = {
        center: new window.kakao.maps.LatLng(33.450701, 126.570667),
        level: 3,
      };

      new window.kakao.maps.Map(mapContainer, mapOption);
    });
  };

  const style = {
    height: "100vh",
  };
  return (
    <>
      <Script
        strategy="afterInteractive"
        type="text/javascript"
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_CLIENT}&autoload=false`}
        onReady={loadKakaoMap}
      ></Script>
      <div style={style} id="map" className="w-full h-screen"></div>
    </>
  );
}