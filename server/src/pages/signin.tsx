import { Dextag, Input } from "@/components"
import { Button, View } from "@/modules"
import React, { useCallback } from "react"

export default function Signin() {
  const onSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log("hello")
  }, [])
  return (
    <View css={{ height: "100vh", justifyContent: "center", alignItems: "center" }}>
      <View as="form" onSubmit={onSubmit}>
        <Dextag fontSize={30} style={{ marginBottom: 30 }} />
        <View>
          <Input />
          <Button colors="BLUE" type="submit">
            Hello
          </Button>
        </View>
      </View>
    </View>
  )
}
