"use client"

import { useMemo } from "react"
import { Card } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { LossData } from "@/app/actions/losses" // MUDANÇA

interface TopProductsCardProps {
  losses: LossData[] // MUDANÇA
}

interface ProductData {
  codigo: string
  descricao: string
  totalPrecoPerda: number
  totalHectoPerda: number
  totalUnidades: number
}

/**
 * Card com ranking dos produtos com maior perda financeira.
 */
export function TopProductsCard({ losses }: TopProductsCardProps) {
  /**
   * Classe base para manter padrao visual do cabecalho da tabela.
   */
  const tableHeadClass =
  // configuração comum para os cabeçalhos da tabela Top produtos
  "whitespace-nowrap text-foreground font-semibold text-xs md:text-sm";

  /**
   * Agrupa perdas por produto, soma valores e devolve o top 10.
   */
  const top10Products = useMemo(() => {
    const productMap = new Map<string, ProductData>()

    losses.forEach((loss) => {
      // Conversão segura: string "0,00" para number float
      const hectoValue = Number.parseFloat(loss.hectoUnid?.replace(",", ".") || "0")
      const precoValue = Number.parseFloat(loss.precoUnid?.replace(",", ".") || "0")
      
      const hectoPerda = loss.quantidade * hectoValue
      const precoPerda = loss.quantidade * precoValue

      if (productMap.has(loss.codigo)) {
        const existing = productMap.get(loss.codigo)!
        existing.totalPrecoPerda += precoPerda
        existing.totalHectoPerda += hectoPerda
        existing.totalUnidades += loss.quantidade
      } else {
        productMap.set(loss.codigo, {
          codigo: loss.codigo,
          descricao: loss.descricao,
          totalPrecoPerda: precoPerda,
          totalHectoPerda: hectoPerda,
          totalUnidades: loss.quantidade,
        })
      }
    })

    return Array.from(productMap.values())
      .sort((a, b) => b.totalPrecoPerda - a.totalPrecoPerda)
      .slice(0, 10)
  }, [losses])
  // Renderiza o card com a tabela dos top 10 produtos, ou mensagem de vazio se nao houver dados.
  return (
    <Card className="bg-card/80 backdrop-blur border-border/50 shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
      <div className="p-4 md:p-6 border-b border-border/30">
        <div>
          <h2 className="text-base md:text-lg font-semibold text-foreground">Top 10 Produtos com Mais Perdas</h2>
          <p className="text-xs text-muted-foreground mt-1">Ordenado por valor total em reais perdido</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-border/30 bg-muted/30 hover:bg-muted/30">
              <TableHead className={`${tableHeadClass} text-center`}>Posição</TableHead>
              <TableHead className={tableHeadClass}>Código</TableHead>
              <TableHead className={`${tableHeadClass} min-w-[200px]`}>
                Descrição
              </TableHead>
              <TableHead className={`${tableHeadClass} text-center`}>
                Valor Total (R$)
              </TableHead>
              <TableHead className={`${tableHeadClass} text-center`}>
                Hectolitros
              </TableHead>
              <TableHead className={`${tableHeadClass} text-center`}>
                Unidades
              </TableHead>
          </TableRow>
          </TableHeader>
          <TableBody>
            {top10Products.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  Nenhum produto encontrado
                </TableCell>
              </TableRow>
            ) : (
              top10Products.map((product, index) => (
                <TableRow key={product.codigo} className="border-border/20 hover:bg-muted/20 transition-colors">
                  <TableCell className="text-center font-bold text-sm text-primary">{index + 1}º</TableCell>
                  <TableCell className="font-mono text-xs md:text-sm font-semibold text-primary">
                    {product.codigo}
                  </TableCell>
                  <TableCell className="text-xs md:text-sm min-w-[200px]">{product.descricao}</TableCell>
                  <TableCell className="text-center text-sm font-bold text-green-600 dark:text-green-400">
                    R$ {product.totalPrecoPerda.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-center text-sm font-medium">
                    {product.totalHectoPerda.toFixed(3)} HL
                  </TableCell>
                  <TableCell className="text-center text-sm font-medium">{product.totalUnidades}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </Card>
  )
}
