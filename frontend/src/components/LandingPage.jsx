import imgImageWithFallback from "figma:asset/28d046f9a36b25ebb211a851864cc5429ebf2d4f.png";
import imgImageWithFallback1 from "figma:asset/6bde711d86e98b4dc44b1cad24ba11f38af49663.png";
import imgImageWithFallback2 from "figma:asset/4201b903c4f548a9bc8c150d17865a4414a20690.png";

// SVG Paths
const svgPaths = {
  p127a4d00: "M3 4.5C3.82843 4.5 4.5 3.82843 4.5 3C4.5 2.17157 3.82843 1.5 3 1.5C2.17157 1.5 1.5 2.17157 1.5 3C1.5 3.82843 2.17157 4.5 3 4.5Z",
  p161d4800: "M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z",
  p18af2500: "M2 6.66667C1.99995 6.47271 2.04222 6.28108 2.12386 6.10514C2.20549 5.92921 2.32453 5.7732 2.47267 5.648L7.13933 1.648C7.37999 1.44461 7.6849 1.33301 8 1.33301C8.3151 1.33301 8.62001 1.44461 8.86067 1.648L13.5273 5.648C13.6755 5.7732 13.7945 5.92921 13.8761 6.10514C13.9578 6.28108 14 6.47271 14 6.66667V12.6667C14 13.0203 13.8595 13.3594 13.6095 13.6095C13.3594 13.8595 13.0203 14 12.6667 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6667V6.66667Z",
  p1d820380: "M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H6C4.93913 15 3.92172 15.4214 3.17157 16.1716C2.42143 16.9217 2 17.9391 2 19V21",
  p1e533000: "M20 5H4C2.89543 5 2 5.89543 2 7V17C2 18.1046 2.89543 19 4 19H20C21.1046 19 22 18.1046 22 17V7C22 5.89543 21.1046 5 20 5Z",
  p1f023100: "M21.801 10C22.2577 12.2413 21.9322 14.5714 20.8789 16.6018C19.8255 18.6322 18.1079 20.2401 16.0125 21.1573C13.9171 22.0746 11.5706 22.2458 9.3643 21.6424C7.15797 21.039 5.22519 19.6974 3.88828 17.8414C2.55136 15.9854 1.89112 13.7272 2.01766 11.4434C2.14421 9.15953 3.04988 6.98809 4.58365 5.29117C6.11742 3.59425 8.18658 2.47443 10.4461 2.11845C12.7056 1.76248 15.0188 2.19186 17 3.335",
  p1f2c5400: "M6 7.33333L8 9.33333L14.6667 2.66667",
  p204bd7c0: "M12 6C13.1935 6 14.3381 6.47411 15.182 7.31802C16.0259 8.16193 16.5 9.30653 16.5 10.5V15.75H13.5V10.5C13.5 10.1022 13.342 9.72064 13.0607 9.43934C12.7794 9.15804 12.3978 9 12 9C11.6022 9 11.2206 9.15804 10.9393 9.43934C10.658 9.72064 10.5 10.1022 10.5 10.5V15.75H7.5V10.5C7.5 9.30653 7.97411 8.16193 8.81802 7.31802C9.66193 6.47411 10.8065 6 12 6Z",
  p27451300: "M16 3.128C16.8578 3.35037 17.6174 3.85126 18.1597 4.55206C18.702 5.25286 18.9962 6.11389 18.9962 7C18.9962 7.88611 18.702 8.74714 18.1597 9.44794C17.6174 10.1487 16.8578 10.6496 16 10.872",
  p28601a80: "M3 10C2.99993 9.70907 3.06333 9.42162 3.18579 9.15772C3.30824 8.89381 3.4868 8.6598 3.709 8.472L10.709 2.472C11.07 2.16691 11.5274 1.99952 12 1.99952C12.4726 1.99952 12.93 2.16691 13.291 2.472L20.291 8.472C20.5132 8.6598 20.6918 8.89381 20.8142 9.15772C20.9367 9.42162 21.0001 9.70907 21 10V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V10Z",
  p2981fe00: "M22 21V19C21.9993 18.1137 21.7044 17.2528 21.1614 16.5523C20.6184 15.8519 19.8581 15.3516 19 15.13",
  p299a6200: "M12.75 1.5H5.25C3.17893 1.5 1.5 3.17893 1.5 5.25V12.75C1.5 14.8211 3.17893 16.5 5.25 16.5H12.75C14.8211 16.5 16.5 14.8211 16.5 12.75V5.25C16.5 3.17893 14.8211 1.5 12.75 1.5Z",
  p2bbf6680: "M15 21V13C15 12.7348 14.8946 12.4804 14.7071 12.2929C14.5196 12.1054 14.2652 12 14 12H10C9.73478 12 9.48043 12.1054 9.29289 12.2929C9.10536 12.4804 9 12.7348 9 13V21",
  p31d670c0: "M8 3.33335L12.6667 8.00002L8 12.6667",
  p32f12c00: "M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4Z",
  p34e03900: "M14.534 6.66667C14.8385 8.16087 14.6215 9.71428 13.9192 11.0679C13.217 12.4214 12.0719 13.4934 10.675 14.1049C9.27809 14.7164 7.71375 14.8305 6.24287 14.4282C4.77198 14.026 3.48346 13.1316 2.59218 11.8943C1.70091 10.657 1.26075 9.15149 1.34511 7.62892C1.42947 6.10636 2.03325 4.65873 3.05577 3.52745C4.07828 2.39617 5.45772 1.64962 6.96404 1.4123C8.47037 1.17498 10.0125 1.46124 11.3333 2.22333",
  p36259e80: "M21 10.656V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H17.344",
  p3a151200: "M10 14V8.66667C10 8.48986 9.92976 8.32029 9.80474 8.19526C9.67971 8.07024 9.51014 8 9.33333 8H6.66667C6.48986 8 6.32029 8.07024 6.19526 8.19526C6.07024 8.32029 6 8.48986 6 8.66667V14",
  p3c358280: "M13.5 1.5H11.25C10.2554 1.5 9.30161 1.89509 8.59835 2.59835C7.89509 3.30161 7.5 4.25544 7.5 5.25V7.5H5.25V10.5H7.5V16.5H10.5V10.5H12.75L13.5 7.5H10.5V5.25C10.5 5.05109 10.579 4.86032 10.7197 4.71967C10.8603 4.57902 11.0511 4.5 11.25 4.5H13.5V1.5Z",
  p3cad6d80: "M12 8.5275C12.0926 9.15168 11.9859 9.78916 11.6953 10.3493C11.4047 10.9094 10.9449 11.3636 10.3812 11.6473C9.81758 11.931 9.17884 12.0297 8.55584 11.9294C7.93284 11.8292 7.35732 11.5351 6.91113 11.0889C6.46494 10.6427 6.1708 10.0672 6.07055 9.44416C5.9703 8.82116 6.06905 8.18242 6.35274 7.61878C6.63644 7.05514 7.09064 6.59531 7.65074 6.30468C8.21084 6.01406 8.84832 5.90744 9.4725 6C10.1092 6.09441 10.6986 6.3911 11.1538 6.84623C11.6089 7.30136 11.9056 7.89081 12 8.5275Z",
  pad25e80: "M4.5 6.75H1.5V15.75H4.5V6.75Z",
  pae4cf80: "M8 3.3334L12.6667 8.00006L8 12.6667",
  pba1780: "M16.5 3C16.5 3 15.975 4.575 15 5.55C16.2 13.05 7.95 18.525 1.5 14.25C3.15 14.325 4.8 13.8 6 12.75C2.25 11.625 0.375 7.2 2.25 3.75C3.9 5.7 6.45 6.825 9 6.75C8.325 3.6 12 1.8 14.25 3.9C15.075 3.9 16.5 3 16.5 3Z",
};

function Heading1() {
  return (
    <div className="h-[96px] relative shrink-0 w-full" data-name="Heading 1">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[48px] left-0 not-italic text-[#101828] text-[48px] top-[-5px] w-[436px]">Simplify Your Shared Living</p>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="h-[112px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[28px] left-0 not-italic text-[#4a5565] text-[20px] top-[-2.2px] w-[542px]">HouseMate is the all-in-one platform that helps roommates manage household tasks, split bills, and coordinate schedules effortlessly. Say goodbye to awkward conversations and confusion.</p>
    </div>
  );
}

function Icon() {
  return (
    <div className="absolute left-[160.36px] size-[16px] top-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M3.33334 8H12.6667" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p31d670c0} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[#9810fa] h-[48px] relative rounded-[8px] shrink-0 w-[188.363px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[48px] relative w-[188.363px]">
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[28px] left-[12px] not-italic text-[18px] text-nowrap text-white top-[8.6px] whitespace-pre">Get Started Free</p>
        <Icon />
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-white h-[49.6px] relative rounded-[8px] shrink-0 w-[158.925px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-[0.8px] border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[8px] h-[49.6px] items-center justify-center px-[32.8px] py-[24.8px] relative w-[158.925px]">
        <p className="font-['Arial:Regular',sans-serif] leading-[28px] not-italic relative shrink-0 text-[18px] text-neutral-950 text-nowrap whitespace-pre">Learn More</p>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex gap-[16px] h-[49.6px] items-start relative shrink-0 w-full" data-name="Container">
      <Button />
      <Button1 />
    </div>
  );
}

function Container1() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[24px] h-[313.6px] items-start left-0 top-[93.2px] w-[548.4px]" data-name="Container">
      <Heading1 />
      <Paragraph />
      <Container />
    </div>
  );
}

function ImageWithFallback() {
  return (
    <div className="h-[500px] relative shrink-0 w-full" data-name="ImageWithFallback">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImageWithFallback} />
    </div>
  );
}

function Container2() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0)] box-border content-stretch flex flex-col h-[500px] items-start left-[596.4px] overflow-clip rounded-[16px] shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] top-0 w-[548.4px]" data-name="Container">
      <ImageWithFallback />
    </div>
  );
}

function Container3() {
  return (
    <div className="h-[500px] relative shrink-0 w-full" data-name="Container">
      <Container1 />
      <Container2 />
    </div>
  );
}

function Section() {
  return (
    <div className="absolute bg-gradient-to-b box-border content-stretch flex flex-col from-[#faf5ff] h-[660px] items-start left-0 pb-0 pt-[80px] px-[24px] to-[#ffffff] top-[68.8px] w-[1192.8px]" data-name="Section">
      <Container3 />
    </div>
  );
}

function Heading2() {
  return (
    <div className="absolute h-[40px] left-0 top-0 w-[1144.8px]" data-name="Heading 2">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[40px] left-[572.85px] not-italic text-[#101828] text-[36px] text-center text-nowrap top-[-3px] translate-x-[-50%] whitespace-pre">Everything You Need to Manage Your Home</p>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="absolute h-[56px] left-[188.4px] top-[56px] w-[768px]" data-name="Paragraph">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[28px] left-[384.3px] not-italic text-[#4a5565] text-[20px] text-center top-[-2.2px] translate-x-[-50%] w-[744px]">HouseMate brings all your household management tools into one intuitive platform, making shared living harmonious and stress-free.</p>
    </div>
  );
}

function Container4() {
  return (
    <div className="h-[112px] relative shrink-0 w-full" data-name="Container">
      <Heading2 />
      <Paragraph1 />
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d={svgPaths.p36259e80} id="Vector" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M9 11L12 14L22 4" id="Vector_2" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Container5() {
  return (
    <div className="absolute bg-blue-100 content-stretch flex items-center justify-center left-[32.8px] rounded-[10px] size-[48px] top-[32.8px]" data-name="Container">
      <Icon1 />
    </div>
  );
}

function Heading3() {
  return (
    <div className="absolute h-[28px] left-[32.8px] top-[96.8px] w-[294.663px]" data-name="Heading 3">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[28px] left-0 not-italic text-[#101828] text-[20px] text-nowrap top-[-2.2px] whitespace-pre">Task Management</p>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="absolute h-[96px] left-[32.8px] top-[136.8px] w-[294.663px]" data-name="Paragraph">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[24px] left-0 not-italic text-[#4a5565] text-[16px] top-[-2.2px] w-[293px]">Create, assign, and track household tasks. Set priorities, due dates, and get reminders so nothing falls through the cracks.</p>
    </div>
  );
}

function Container6() {
  return (
    <div className="absolute bg-white h-[265.6px] left-0 rounded-[14px] top-0 w-[360.263px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0.8px] border-gray-200 border-solid inset-0 pointer-events-none rounded-[14px]" />
      <Container5 />
      <Heading3 />
      <Paragraph2 />
    </div>
  );
}

function Icon2() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d={svgPaths.p1e533000} id="Vector" stroke="var(--stroke-0, #00A63E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M2 10H22" id="Vector_2" stroke="var(--stroke-0, #00A63E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Container7() {
  return (
    <div className="absolute bg-green-100 content-stretch flex items-center justify-center left-[32.8px] rounded-[10px] size-[48px] top-[32.8px]" data-name="Container">
      <Icon2 />
    </div>
  );
}

function Heading5() {
  return (
    <div className="absolute h-[28px] left-[32.8px] top-[96.8px] w-[294.663px]" data-name="Heading 3">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[28px] left-0 not-italic text-[#101828] text-[20px] text-nowrap top-[-2.2px] whitespace-pre">Bill Splitting</p>
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="absolute h-[72px] left-[32.8px] top-[136.8px] w-[294.663px]" data-name="Paragraph">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[24px] left-0 not-italic text-[#4a5565] text-[16px] top-[-2.2px] w-[283px]">Easily split bills, track payments, and see who owes what. Support for equal splits or custom allocations.</p>
    </div>
  );
}

function Container8() {
  return (
    <div className="absolute bg-white h-[265.6px] left-[392.26px] rounded-[14px] top-0 w-[360.263px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0.8px] border-gray-200 border-solid inset-0 pointer-events-none rounded-[14px]" />
      <Container7 />
      <Heading5 />
      <Paragraph3 />
    </div>
  );
}

function Icon3() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d="M8 2V6" id="Vector" stroke="var(--stroke-0, #9810FA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M16 2V6" id="Vector_2" stroke="var(--stroke-0, #9810FA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.p32f12c00} id="Vector_3" stroke="var(--stroke-0, #9810FA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M3 10H21" id="Vector_4" stroke="var(--stroke-0, #9810FA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Container9() {
  return (
    <div className="absolute bg-purple-100 content-stretch flex items-center justify-center left-[32.8px] rounded-[10px] size-[48px] top-[32.8px]" data-name="Container">
      <Icon3 />
    </div>
  );
}

function Heading6() {
  return (
    <div className="absolute h-[28px] left-[32.8px] top-[96.8px] w-[294.675px]" data-name="Heading 3">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[28px] left-0 not-italic text-[#101828] text-[20px] text-nowrap top-[-2.2px] whitespace-pre">Shared Calendar</p>
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="absolute h-[72px] left-[32.8px] top-[136.8px] w-[294.675px]" data-name="Paragraph">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[24px] left-0 not-italic text-[#4a5565] text-[16px] top-[-2.2px] w-[282px]">Coordinate schedules, plan events, and see all household activities in one place. Never miss important dates.</p>
    </div>
  );
}

function Container10() {
  return (
    <div className="absolute bg-white h-[265.6px] left-[784.52px] rounded-[14px] top-0 w-[360.275px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0.8px] border-gray-200 border-solid inset-0 pointer-events-none rounded-[14px]" />
      <Container9 />
      <Heading6 />
      <Paragraph4 />
    </div>
  );
}

function Icon4() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d={svgPaths.p1d820380} id="Vector" stroke="var(--stroke-0, #F54900)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.p27451300} id="Vector_2" stroke="var(--stroke-0, #F54900)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.p2981fe00} id="Vector_3" stroke="var(--stroke-0, #F54900)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.p161d4800} id="Vector_4" stroke="var(--stroke-0, #F54900)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Container11() {
  return (
    <div className="absolute bg-[#ffedd4] content-stretch flex items-center justify-center left-[32.8px] rounded-[10px] size-[48px] top-[32.8px]" data-name="Container">
      <Icon4 />
    </div>
  );
}

function Heading7() {
  return (
    <div className="absolute h-[28px] left-[32.8px] top-[96.8px] w-[294.663px]" data-name="Heading 3">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[28px] left-0 not-italic text-[#101828] text-[20px] text-nowrap top-[-2.2px] whitespace-pre">Housemate Profiles</p>
    </div>
  );
}

function Paragraph5() {
  return (
    <div className="absolute h-[96px] left-[32.8px] top-[136.8px] w-[294.663px]" data-name="Paragraph">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[24px] left-0 not-italic text-[#4a5565] text-[16px] top-[-2.2px] w-[273px]">{`Keep everyone's contact info, preferences, and activity history organized. Know who's responsible for what.`}</p>
    </div>
  );
}

function Container12() {
  return (
    <div className="absolute bg-white h-[265.6px] left-0 rounded-[14px] top-[297.6px] w-[360.263px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0.8px] border-gray-200 border-solid inset-0 pointer-events-none rounded-[14px]" />
      <Container11 />
      <Heading7 />
      <Paragraph5 />
    </div>
  );
}

function Icon5() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d={svgPaths.p1f023100} id="Vector" stroke="var(--stroke-0, #E60076)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M9 11L12 14L22 4" id="Vector_2" stroke="var(--stroke-0, #E60076)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Container13() {
  return (
    <div className="absolute bg-pink-100 content-stretch flex items-center justify-center left-[32.8px] rounded-[10px] size-[48px] top-[32.8px]" data-name="Container">
      <Icon5 />
    </div>
  );
}

function Heading8() {
  return (
    <div className="absolute h-[28px] left-[32.8px] top-[96.8px] w-[294.663px]" data-name="Heading 3">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[28px] left-0 not-italic text-[#101828] text-[20px] text-nowrap top-[-2.2px] whitespace-pre">Activity Tracking</p>
    </div>
  );
}

function Paragraph6() {
  return (
    <div className="absolute h-[72px] left-[32.8px] top-[136.8px] w-[294.663px]" data-name="Paragraph">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[24px] left-0 not-italic text-[#4a5565] text-[16px] top-[-2.2px] w-[266px]">See real-time updates on completed tasks, payments made, and upcoming responsibilities for full transparency.</p>
    </div>
  );
}

function Container14() {
  return (
    <div className="absolute bg-white h-[265.6px] left-[392.26px] rounded-[14px] top-[297.6px] w-[360.263px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0.8px] border-gray-200 border-solid inset-0 pointer-events-none rounded-[14px]" />
      <Container13 />
      <Heading8 />
      <Paragraph6 />
    </div>
  );
}

function Icon6() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d={svgPaths.p2bbf6680} id="Vector" stroke="var(--stroke-0, #4F39F6)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.p28601a80} id="Vector_2" stroke="var(--stroke-0, #4F39F6)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Container15() {
  return (
    <div className="absolute bg-indigo-100 content-stretch flex items-center justify-center left-[32.8px] rounded-[10px] size-[48px] top-[32.8px]" data-name="Container">
      <Icon6 />
    </div>
  );
}

function Heading9() {
  return (
    <div className="absolute h-[28px] left-[32.8px] top-[96.8px] w-[294.675px]" data-name="Heading 3">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[28px] left-0 not-italic text-[#101828] text-[20px] text-nowrap top-[-2.2px] whitespace-pre">Dashboard Overview</p>
    </div>
  );
}

function Paragraph7() {
  return (
    <div className="absolute h-[72px] left-[32.8px] top-[136.8px] w-[294.675px]" data-name="Paragraph">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[24px] left-0 not-italic text-[#4a5565] text-[16px] top-[-2.2px] w-[252px]">Get a comprehensive view of your household at a glance with stats, upcoming tasks, and recent activity.</p>
    </div>
  );
}

function Container16() {
  return (
    <div className="absolute bg-white h-[265.6px] left-[784.52px] rounded-[14px] top-[297.6px] w-[360.275px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0.8px] border-gray-200 border-solid inset-0 pointer-events-none rounded-[14px]" />
      <Container15 />
      <Heading9 />
      <Paragraph7 />
    </div>
  );
}

function Container17() {
  return (
    <div className="h-[563.2px] relative shrink-0 w-full" data-name="Container">
      <Container6 />
      <Container8 />
      <Container10 />
      <Container12 />
      <Container14 />
      <Container16 />
    </div>
  );
}

function Section1() {
  return (
    <div className="absolute bg-white box-border content-stretch flex flex-col gap-[64px] h-[963.2px] items-start left-0 pb-0 pt-[80px] px-[24px] top-[728.8px] w-[1192.8px]" data-name="Section">
      <Container4 />
      <Container17 />
    </div>
  );
}

function Heading10() {
  return (
    <div className="h-[40px] relative shrink-0 w-full" data-name="Heading 2">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[40px] left-0 not-italic text-[#101828] text-[36px] text-nowrap top-[-3px] whitespace-pre">Why Choose HouseMate?</p>
    </div>
  );
}

function Icon7() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_1_320)" id="Icon">
          <path d={svgPaths.p34e03900} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p1f2c5400} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
        <defs>
          <clipPath id="clip0_1_320">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container18() {
  return (
    <div className="absolute bg-[#9810fa] content-stretch flex items-center justify-center left-0 rounded-[2.68435e+07px] size-[24px] top-[4px]" data-name="Container">
      <Icon7 />
    </div>
  );
}

function Heading11() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[28px] left-0 not-italic text-[#101828] text-[18px] text-nowrap top-[-1.4px] whitespace-pre">{`Fair & Transparent`}</p>
    </div>
  );
}

function Paragraph8() {
  return (
    <div className="h-[48px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[24px] left-0 not-italic text-[#4a5565] text-[16px] top-[-2.2px] w-[488px]">Keep everyone accountable with clear task assignments and payment tracking. No more disputes about who did what.</p>
    </div>
  );
}

function Container19() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[8px] h-[84px] items-start left-[40px] top-0 w-[508.4px]" data-name="Container">
      <Heading11 />
      <Paragraph8 />
    </div>
  );
}

function Container20() {
  return (
    <div className="h-[84px] relative shrink-0 w-full" data-name="Container">
      <Container18 />
      <Container19 />
    </div>
  );
}

function Icon8() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_1_320)" id="Icon">
          <path d={svgPaths.p34e03900} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p1f2c5400} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
        <defs>
          <clipPath id="clip0_1_320">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container21() {
  return (
    <div className="absolute bg-[#9810fa] content-stretch flex items-center justify-center left-0 rounded-[2.68435e+07px] size-[24px] top-[4px]" data-name="Container">
      <Icon8 />
    </div>
  );
}

function Heading12() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[28px] left-0 not-italic text-[#101828] text-[18px] text-nowrap top-[-1.4px] whitespace-pre">Easy to Use</p>
    </div>
  );
}

function Paragraph9() {
  return (
    <div className="h-[48px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[24px] left-0 not-italic text-[#4a5565] text-[16px] top-[-2.2px] w-[454px]">Intuitive interface that anyone can use. Set up your household in minutes and start managing tasks right away.</p>
    </div>
  );
}

function Container22() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[8px] h-[84px] items-start left-[40px] top-0 w-[508.4px]" data-name="Container">
      <Heading12 />
      <Paragraph9 />
    </div>
  );
}

function Container23() {
  return (
    <div className="h-[84px] relative shrink-0 w-full" data-name="Container">
      <Container21 />
      <Container22 />
    </div>
  );
}

function Icon9() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_1_320)" id="Icon">
          <path d={svgPaths.p34e03900} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p1f2c5400} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
        <defs>
          <clipPath id="clip0_1_320">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container24() {
  return (
    <div className="absolute bg-[#9810fa] content-stretch flex items-center justify-center left-0 rounded-[2.68435e+07px] size-[24px] top-[4px]" data-name="Container">
      <Icon9 />
    </div>
  );
}

function Heading13() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[28px] left-0 not-italic text-[#101828] text-[18px] text-nowrap top-[-1.4px] whitespace-pre">Stay Organized</p>
    </div>
  );
}

function Paragraph10() {
  return (
    <div className="h-[48px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[24px] left-0 not-italic text-[#4a5565] text-[16px] top-[-2.2px] w-[496px]">All household information in one place. Never forget a bill due date or whose turn it is to clean the kitchen.</p>
    </div>
  );
}

function Container25() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[8px] h-[84px] items-start left-[40px] top-0 w-[508.4px]" data-name="Container">
      <Heading13 />
      <Paragraph10 />
    </div>
  );
}

function Container26() {
  return (
    <div className="h-[84px] relative shrink-0 w-full" data-name="Container">
      <Container24 />
      <Container25 />
    </div>
  );
}

function Icon10() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_1_320)" id="Icon">
          <path d={svgPaths.p34e03900} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p1f2c5400} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
        <defs>
          <clipPath id="clip0_1_320">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container27() {
  return (
    <div className="absolute bg-[#9810fa] content-stretch flex items-center justify-center left-0 rounded-[2.68435e+07px] size-[24px] top-[4px]" data-name="Container">
      <Icon10 />
    </div>
  );
}

function Heading14() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[28px] left-0 not-italic text-[#101828] text-[18px] text-nowrap top-[-1.4px] whitespace-pre">Reduce Conflicts</p>
    </div>
  );
}

function Paragraph11() {
  return (
    <div className="h-[48px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[24px] left-0 not-italic text-[#4a5565] text-[16px] top-[-2.2px] w-[502px]">Clear communication and expectations prevent misunderstandings and keep everyone on the same page.</p>
    </div>
  );
}

function Container28() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[8px] h-[84px] items-start left-[40px] top-0 w-[508.4px]" data-name="Container">
      <Heading14 />
      <Paragraph11 />
    </div>
  );
}

function Container29() {
  return (
    <div className="h-[84px] relative shrink-0 w-full" data-name="Container">
      <Container27 />
      <Container28 />
    </div>
  );
}

function Container30() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] h-[408px] items-start relative shrink-0 w-full" data-name="Container">
      <Container20 />
      <Container23 />
      <Container26 />
      <Container29 />
    </div>
  );
}

function Container31() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[24px] h-[472px] items-start left-0 top-[32px] w-[548.4px]" data-name="Container">
      <Heading10 />
      <Container30 />
    </div>
  );
}

function ImageWithFallback1() {
  return (
    <div className="h-[256px] relative shrink-0 w-full" data-name="ImageWithFallback">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImageWithFallback1} />
    </div>
  );
}

function Container32() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0)] box-border content-stretch flex flex-col h-[256px] items-start left-0 overflow-clip rounded-[16px] shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)] top-0 w-[548.4px]" data-name="Container">
      <ImageWithFallback1 />
    </div>
  );
}

function ImageWithFallback2() {
  return (
    <div className="h-[256px] relative shrink-0 w-full" data-name="ImageWithFallback">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImageWithFallback2} />
    </div>
  );
}

function Container33() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0)] box-border content-stretch flex flex-col h-[256px] items-start left-0 overflow-clip rounded-[16px] shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)] top-[280px] w-[548.4px]" data-name="Container">
      <ImageWithFallback2 />
    </div>
  );
}

function Container34() {
  return (
    <div className="absolute h-[536px] left-[596.4px] top-0 w-[548.4px]" data-name="Container">
      <Container32 />
      <Container33 />
    </div>
  );
}

function Section2() {
  return (
    <div className="absolute bg-purple-50 h-[536px] left-[24px] top-[1772px] w-[1144.8px]" data-name="Section">
      <Container31 />
      <Container34 />
    </div>
  );
}

function Heading15() {
  return (
    <div className="absolute h-[40px] left-[24px] top-0 w-[848px]" data-name="Heading 2">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[40px] left-[424.27px] not-italic text-[36px] text-center text-nowrap text-white top-[-3px] translate-x-[-50%] whitespace-pre">Ready to Transform Your Household?</p>
    </div>
  );
}

function Paragraph12() {
  return (
    <div className="absolute h-[56px] left-[24px] top-[64px] w-[848px]" data-name="Paragraph">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[28px] left-[424.04px] not-italic text-[20px] text-center text-purple-100 top-[-2.2px] translate-x-[-50%] w-[820px]">Join thousands of happy roommates who have simplified their shared living with HouseMate. Get started today for free!</p>
    </div>
  );
}

function Icon11() {
  return (
    <div className="absolute left-[163.86px] size-[16px] top-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M3.33335 8H12.6667" id="Vector" stroke="var(--stroke-0, #9810FA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.pae4cf80} id="Vector_2" stroke="var(--stroke-0, #9810FA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button2() {
  return (
    <div className="absolute bg-white h-[48px] left-[352.06px] rounded-[8px] top-[152px] w-[191.863px]" data-name="Button">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[28px] left-[12px] not-italic text-[#9810fa] text-[18px] text-nowrap top-[8.6px] whitespace-pre">Get Started Now</p>
      <Icon11 />
    </div>
  );
}

function Container35() {
  return (
    <div className="h-[200px] relative shrink-0 w-full" data-name="Container">
      <Heading15 />
      <Paragraph12 />
      <Button2 />
    </div>
  );
}

function Section3() {
  return (
    <div className="absolute bg-[#9810fa] box-border content-stretch flex flex-col h-[360px] items-start left-0 pb-0 pt-[80px] px-[148.4px] top-[2388px] w-[1192.8px]" data-name="Section">
      <Container35 />
    </div>
  );
}

function Icon12() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p3a151200} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p18af2500} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Container36() {
  return (
    <div className="bg-[#9810fa] relative rounded-[10px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[32px]">
        <Icon12 />
      </div>
    </div>
  );
}

function Text() {
  return (
    <div className="h-[28px] relative shrink-0 w-[101.562px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[28px] relative w-[101.562px]">
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[28px] left-0 not-italic text-[20px] text-nowrap text-white top-[-2.2px] whitespace-pre">HouseMate</p>
      </div>
    </div>
  );
}

function Container37() {
  return (
    <div className="content-stretch flex gap-[8px] h-[32px] items-center relative shrink-0 w-full" data-name="Container">
      <Container36 />
      <Text />
    </div>
  );
}

function Paragraph13() {
  return (
    <div className="h-[40px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#99a1af] text-[14px] top-[-1.2px] w-[250px]">Simplifying shared living, one household at a time.</p>
    </div>
  );
}

function Container38() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[16px] h-[144px] items-start left-0 top-0 w-[262.2px]" data-name="Container">
      <Container37 />
      <Paragraph13 />
    </div>
  );
}

function Heading4() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Heading 4">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[24px] left-0 not-italic text-[16px] text-nowrap text-white top-[-2.2px] whitespace-pre">Product</p>
    </div>
  );
}

function Button3() {
  return (
    <div className="absolute h-[20px] left-0 top-0 w-[52.087px]" data-name="Button">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#d1d5dc] text-[14px] text-nowrap top-[-1.2px] whitespace-pre">Features</p>
    </div>
  );
}

function ListItem() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="List Item">
      <Button3 />
    </div>
  );
}

function Link() {
  return (
    <div className="absolute content-stretch flex h-[18.4px] items-start left-0 top-[0.8px] w-[82.9px]" data-name="Link">
      <p className="font-['Arial:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#d1d5dc] text-[14px] text-nowrap whitespace-pre">How It Works</p>
    </div>
  );
}

function ListItem1() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="List Item">
      <Link />
    </div>
  );
}

function Link1() {
  return (
    <div className="absolute content-stretch flex h-[18.4px] items-start left-0 top-[0.8px] w-[25.613px]" data-name="Link">
      <p className="font-['Arial:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#d1d5dc] text-[14px] text-nowrap whitespace-pre">FAQ</p>
    </div>
  );
}

function ListItem2() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="List Item">
      <Link1 />
    </div>
  );
}

function List() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[76px] items-start relative shrink-0 w-full" data-name="List">
      <ListItem />
      <ListItem1 />
      <ListItem2 />
    </div>
  );
}

function Container39() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[16px] h-[144px] items-start left-[294.2px] top-0 w-[262.2px]" data-name="Container">
      <Heading4 />
      <List />
    </div>
  );
}

function Heading16() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Heading 4">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[24px] left-0 not-italic text-[16px] text-nowrap text-white top-[-2.2px] whitespace-pre">Company</p>
    </div>
  );
}

function Link2() {
  return (
    <div className="absolute content-stretch flex h-[18.4px] items-start left-0 top-[0.8px] w-[57.525px]" data-name="Link">
      <p className="font-['Arial:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#d1d5dc] text-[14px] text-nowrap whitespace-pre">About Us</p>
    </div>
  );
}

function ListItem3() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="List Item">
      <Link2 />
    </div>
  );
}

function Link3() {
  return (
    <div className="absolute content-stretch flex h-[18.4px] items-start left-0 top-[0.8px] w-[47.875px]" data-name="Link">
      <p className="font-['Arial:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#d1d5dc] text-[14px] text-nowrap whitespace-pre">Contact</p>
    </div>
  );
}

function ListItem4() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="List Item">
      <Link3 />
    </div>
  );
}

function Link4() {
  return (
    <div className="absolute content-stretch flex h-[18.4px] items-start left-0 top-[0.8px] w-[46.112px]" data-name="Link">
      <p className="font-['Arial:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#d1d5dc] text-[14px] text-nowrap whitespace-pre">Careers</p>
    </div>
  );
}

function ListItem5() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="List Item">
      <Link4 />
    </div>
  );
}

function Link5() {
  return (
    <div className="absolute content-stretch flex h-[18.4px] items-start left-0 top-[0.8px] w-[27.875px]" data-name="Link">
      <p className="font-['Arial:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#d1d5dc] text-[14px] text-nowrap whitespace-pre">Blog</p>
    </div>
  );
}

function ListItem6() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="List Item">
      <Link5 />
    </div>
  );
}

function List1() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[104px] items-start relative shrink-0 w-full" data-name="List">
      <ListItem3 />
      <ListItem4 />
      <ListItem5 />
      <ListItem6 />
    </div>
  );
}

function Container40() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[16px] h-[144px] items-start left-[588.4px] top-0 w-[262.2px]" data-name="Container">
      <Heading16 />
      <List1 />
    </div>
  );
}

function Heading17() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Heading 4">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[24px] left-0 not-italic text-[16px] text-nowrap text-white top-[-2.2px] whitespace-pre">Account</p>
    </div>
  );
}

function Button4() {
  return (
    <div className="absolute h-[20px] left-0 top-0 w-[42.487px]" data-name="Button">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#d1d5dc] text-[14px] text-nowrap top-[-1.2px] whitespace-pre">Sign In</p>
    </div>
  );
}

function ListItem7() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="List Item">
      <Button4 />
    </div>
  );
}

function Button5() {
  return (
    <div className="absolute h-[20px] left-0 top-0 w-[48.688px]" data-name="Button">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#d1d5dc] text-[14px] text-nowrap top-[-1.2px] whitespace-pre">Sign Up</p>
    </div>
  );
}

function ListItem8() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="List Item">
      <Button5 />
    </div>
  );
}

function Link6() {
  return (
    <div className="absolute content-stretch flex h-[18.4px] items-start left-0 top-[0.8px] w-[82.563px]" data-name="Link">
      <p className="font-['Arial:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#d1d5dc] text-[14px] text-nowrap whitespace-pre">Privacy Policy</p>
    </div>
  );
}

function ListItem9() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="List Item">
      <Link6 />
    </div>
  );
}

function Link7() {
  return (
    <div className="absolute content-stretch flex h-[18.4px] items-start left-0 top-[0.8px] w-[99.925px]" data-name="Link">
      <p className="font-['Arial:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#d1d5dc] text-[14px] text-nowrap whitespace-pre">Terms of Service</p>
    </div>
  );
}

function ListItem10() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="List Item">
      <Link7 />
    </div>
  );
}

function List2() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[104px] items-start relative shrink-0 w-full" data-name="List">
      <ListItem7 />
      <ListItem8 />
      <ListItem9 />
      <ListItem10 />
    </div>
  );
}

function Container41() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[16px] h-[144px] items-start left-[882.6px] top-0 w-[262.2px]" data-name="Container">
      <Heading17 />
      <List2 />
    </div>
  );
}

function Container42() {
  return (
    <div className="h-[144px] relative shrink-0 w-full" data-name="Container">
      <Container38 />
      <Container39 />
      <Container40 />
      <Container41 />
    </div>
  );
}

function Paragraph14() {
  return (
    <div className="h-[20px] relative shrink-0 w-[242.5px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[242.5px]">
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#99a1af] text-[14px] text-nowrap top-[-1.2px] whitespace-pre">© 2025 HouseMate. All rights reserved.</p>
      </div>
    </div>
  );
}

function Icon13() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Icon">
          <path d={svgPaths.p3c358280} id="Vector" stroke="var(--stroke-0, #D1D5DC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Link8() {
  return (
    <div className="absolute bg-[#1e2939] content-stretch flex items-center justify-center left-0 rounded-[10px] size-[40px] top-0" data-name="Link">
      <Icon13 />
    </div>
  );
}

function Icon14() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Icon">
          <path d={svgPaths.pba1780} id="Vector" stroke="var(--stroke-0, #D1D5DC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Link9() {
  return (
    <div className="absolute bg-[#1e2939] content-stretch flex items-center justify-center left-[56px] rounded-[10px] size-[40px] top-0" data-name="Link">
      <Icon14 />
    </div>
  );
}

function Icon15() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g clipPath="url(#clip0_1_352)" id="Icon">
          <path d={svgPaths.p299a6200} id="Vector" stroke="var(--stroke-0, #D1D5DC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p3cad6d80} id="Vector_2" stroke="var(--stroke-0, #D1D5DC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M13.125 4.875H13.1325" id="Vector_3" stroke="var(--stroke-0, #D1D5DC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
        <defs>
          <clipPath id="clip0_1_352">
            <rect fill="white" height="18" width="18" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Link10() {
  return (
    <div className="absolute bg-[#1e2939] content-stretch flex items-center justify-center left-[112px] rounded-[10px] size-[40px] top-0" data-name="Link">
      <Icon15 />
    </div>
  );
}

function Icon16() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Icon">
          <path d={svgPaths.p204bd7c0} id="Vector" stroke="var(--stroke-0, #D1D5DC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.pad25e80} id="Vector_2" stroke="var(--stroke-0, #D1D5DC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p127a4d00} id="Vector_3" stroke="var(--stroke-0, #D1D5DC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Link11() {
  return (
    <div className="absolute bg-[#1e2939] content-stretch flex items-center justify-center left-[168px] rounded-[10px] size-[40px] top-0" data-name="Link">
      <Icon16 />
    </div>
  );
}

function Container43() {
  return (
    <div className="h-[40px] relative shrink-0 w-[208px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[40px] relative w-[208px]">
        <Link8 />
        <Link9 />
        <Link10 />
        <Link11 />
      </div>
    </div>
  );
}

function Container44() {
  return (
    <div className="h-[72.8px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#1e2939] border-[0.8px_0px_0px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[72.8px] items-center justify-between pb-0 pt-[0.8px] px-0 relative w-full">
          <Paragraph14 />
          <Container43 />
        </div>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <div className="absolute bg-[#101828] box-border content-stretch flex flex-col gap-[32px] h-[248.8px] items-start left-0 px-[24px] py-0 top-[2796px] w-[1192.8px]" data-name="Footer">
      <Container42 />
      <Container44 />
    </div>
  );
}

function LandingPage() {
  return (
    <div className="absolute bg-white h-[3092.8px] left-0 top-0 w-[1192.8px]" data-name="LandingPage">
      <Section />
      <Section1 />
      <Section2 />
      <Section3 />
      <Footer />
    </div>
  );
}

function Icon17() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p3a151200} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p18af2500} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Container45() {
  return (
    <div className="bg-[#9810fa] relative rounded-[10px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[32px]">
        <Icon17 />
      </div>
    </div>
  );
}

function Text1() {
  return (
    <div className="basis-0 grow h-[28px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[28px] relative w-full">
        <p className="absolute font-['Arial:Bold',sans-serif] leading-[28px] left-0 not-italic text-[#101828] text-[20px] text-nowrap top-[-2.2px] whitespace-pre">HouseMate</p>
      </div>
    </div>
  );
}

function Container46() {
  return (
    <div className="h-[32px] relative shrink-0 w-[144.238px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[8px] h-[32px] items-center relative w-[144.238px]">
        <Container45 />
        <Text1 />
      </div>
    </div>
  );
}

function Button6() {
  return (
    <div className="h-[36px] relative rounded-[8px] shrink-0 w-[75.987px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[8px] h-[36px] items-center justify-center px-[16px] py-[8px] relative w-[75.987px]">
        <p className="font-['Arial:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[14px] text-neutral-950 text-nowrap whitespace-pre">Sign In</p>
      </div>
    </div>
  );
}

function Button7() {
  return (
    <div className="bg-[#9810fa] h-[36px] relative rounded-[8px] shrink-0 w-[104.138px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[8px] h-[36px] items-center justify-center px-[16px] py-[8px] relative w-[104.138px]">
        <p className="font-['Arial:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[14px] text-nowrap text-white whitespace-pre">Get Started</p>
      </div>
    </div>
  );
}

function Container47() {
  return (
    <div className="h-[36px] relative shrink-0 w-[196.125px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[16px] h-[36px] items-center relative w-[196.125px]">
        <Button6 />
        <Button7 />
      </div>
    </div>
  );
}

function LandingPage1() {
  return (
    <div className="absolute bg-white box-border content-stretch flex h-[68px] items-center justify-between left-0 pb-[0.8px] pt-0 px-[24px] top-0 w-[1192.8px]" data-name="LandingPage">
      <div aria-hidden="true" className="absolute border-[0px_0px_0.8px] border-black border-solid inset-0 pointer-events-none" />
      <Container46 />
      <Container47 />
    </div>
  );
}

export default function App() {
  return (
    <div className="bg-white relative size-full" data-name="Build Webpage with React">
      <LandingPage />
      <LandingPage1 />
    </div>
  );
}
