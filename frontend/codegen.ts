import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
	overwrite: true,
	schema: "http://localhost:4001/graphql",
	documents: ["src/graphql/**/*.graphql", "src/**/*.tsx"],
	generates: {
		"src/generated/graphql.tsx": {
			plugins: [
				"typescript",
				"typescript-operations",
				"typescript-react-apollo",
			],
			config: {
				withHooks: true,
			},
		},
		"./graphql.schema.json": {
			plugins: ["introspection"],
		},
	},
};

export default config;
