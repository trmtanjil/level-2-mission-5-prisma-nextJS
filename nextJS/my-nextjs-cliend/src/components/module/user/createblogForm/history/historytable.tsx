import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { BlogPost } from "@/types"

 
export function HistoryTable({posts}:{posts:BlogPost[]}) {
  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead >Title</TableHead>
          <TableHead>tags</TableHead>
          <TableHead>View</TableHead>
          <TableHead className="text-right">isFeatured</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
      
          {posts.map((posts) => (
          <TableRow  key={posts.id}>
               <TableCell className="font-medium">{posts.title}</TableCell>
            <TableCell className="font-medium">{posts.tags}</TableCell>
            <TableCell>{posts.views}</TableCell>
                        <TableCell>{posts?.isFeatured}</TableCell>

        
             
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}
