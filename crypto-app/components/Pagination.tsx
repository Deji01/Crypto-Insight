import { Button } from "@/components/ui/button"

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  return (
    <div className="flex justify-center mt-4 space-x-2">
      {currentPage > 1 && (
        <Button variant="outline" onClick={() => onPageChange(currentPage - 1)}>
          {currentPage - 1}
        </Button>
      )}
      <Button variant="default">{currentPage}</Button>
      {currentPage < totalPages && (
        <Button variant="outline" onClick={() => onPageChange(currentPage + 1)}>
          {currentPage + 1}
        </Button>
      )}
    </div>
  )
}