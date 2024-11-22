
## DBの実行
```
node --loader ts-node/esm src/testDbConnection.ts
```

## prisma マイグレーション (schemaの変更をDBへ反映させる)
```
npx prisma migrate dev --name <ファイル名>
```
