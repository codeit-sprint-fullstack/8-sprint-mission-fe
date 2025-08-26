import useWindowSizeCustom from "./useWindowSizeCustom";

const useItemCount = () => {
  const windowSize = useWindowSizeCustom();
  const windowWidth = windowSize.width;

  console.log("🔍 Debug:", {
    windowWidth,
    type: typeof windowWidth,
    isUndefined: windowWidth === undefined,
  });

  let itemCount = 4;

  if (windowWidth === undefined) {
    console.log("🔴 windowWidth is undefined, using default: 4");
    return 4;
  }

  if (windowWidth >= 1200) {
    itemCount = 10;
    console.log("✅ Desktop mode (>=1200): 10 items");
  } else if (windowWidth >= 768) {
    itemCount = 6;
    console.log("✅ Tablet mode (>=768): 6 items");
  } else {
    itemCount = 4;
    console.log("✅ Mobile mode (<768): 4 items");
  }

  console.log(
    `📊 Final result: windowWidth=${windowWidth} → itemCount=${itemCount}`
  );

  return itemCount;
};

export default useItemCount;
