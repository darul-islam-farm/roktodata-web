import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger
} from '@/components/ui/select'

type TProps = {
  value: string
  // eslint-disable-next-line no-unused-vars
  setValue: (name: string, value: string) => void
  data: { name: string; value: string }[]
  label: string
  name: string
  defaultValue?: string
  onChange?: () => void
}

export default function MySelect({
  value,
  setValue,
  data,
  label,
  name,
  defaultValue,
  onChange
}: TProps) {
  return (
    <div>
      <p className='font-medium mb-1 text-sm'>{label}</p>
      <Select
        defaultValue={defaultValue}
        onValueChange={(item) => {
          setValue(name, item)
          return onChange && onChange()
        }}
      >
        <SelectTrigger>{value || defaultValue || 'Select'}</SelectTrigger>
        <SelectContent>
          {data.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
