import clsx from "clsx"
import React from "react"
import { Controller, useWatch } from "react-hook-form"
import RadioGroup from "../../../../components/organisms/radio-group"
import { useDiscountForm } from "../form/discount-form-context"

const PromotionType = () => {
  const { control, isFreeShipping, setIsFreeShipping } = useDiscountForm()

  const regions = useWatch({
    control,
    name: "regions",
  })

  return (
    <Controller
      name="rule.type"
      control={control}
      rules={{ required: true }}
      render={({ onChange, value }) => {
        return (
          <RadioGroup.Root
            value={value}
            onValueChange={(values) => {
              if (values === "free_shipping" && !isFreeShipping) {
                setIsFreeShipping(true)
              } else if (values !== "free_shipping" && isFreeShipping) {
                setIsFreeShipping(false)
              }

              onChange(values)
            }}
            className={clsx("flex items-center gap-base mt-base px-1")}
          >
            <RadioGroup.Item
              value="percentage"
              className="flex-1"
              label="Percentage"
              description={"Discount applied in %"}
            />
            <RadioGroup.Item
              value="fixed"
              className="flex-1"
              label="Fixed amount"
              description={"Discount in whole numbers"}
              disabled={Array.isArray(regions) && regions.length > 1}
              disabledTooltip="You can only select one valid region if you want to use the fixed amount type"
            />
            <RadioGroup.Item
              value="free_shipping"
              className="flex-1"
              label="Free shipping"
              description={"Override delivery amount"}
            />
          </RadioGroup.Root>
        )
      }}
    />
  )
}

export default PromotionType
