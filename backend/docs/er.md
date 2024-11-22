# ER図


```mermaid
---
title: "食材計算アプリ"
---
erDiagram
    users ||--o{ recipes : "作成する"
    users ||--o{ menus : "作成する"
    recipes ||--o{ recipe_ingredients : "含む"
    recipes ||--o{ menu_recipes : "含まれる"
    ingredients ||--o{ recipe_ingredients : "使われる"
    menus  ||--o{ shopping_lists : "作成する"
    menus  ||--o{ menu_recipes : "含む"
    shopping_lists  ||--o{ shopping_list_ingredients : "含む"
    ingredients ||--o{ shopping_list_ingredients : "含まれる"
    ingredients ||--o{ units : "使う"

    users {
        int id PK "ID"
        varchar username "ユーザー名"
        varchar email "メールアドレス"
        varchar password "パスワード"
        datetime created_at "作成日"
        datetime updated_at "更新日"
    }

    recipes {
        int id PK "ID"
        int user_id FK "usersのID"
        varchar name "レシピ名"
        varchar image_url "レシピの画像"
        text description "説明文"
        datetime created_at "作成日"
        datetime updated_at "更新日"
    }


    recipe_ingredients {
        int id PK "ID"
        int recipe_id FK "recipeのID"
        int ingredient_id FK "ingredientのID"
        float quantity "量"
        datetime created_at "作成日"
        datetime updated_at "更新日"
    }

    ingredients {
        int id PK "ID"
        int units_id FK "unitsのID"
        varchar name "材料名"
        string category "材料カテゴリ"
        datetime created_at "作成日"
        datetime updated_at "更新日"
    }

     units {
        int id PK "ID"
        varchar unit "単位"
        datetime created_at "作成日"
        datetime updated_at "更新日"
    }

    menus {
        int id PK "ID"
        int user_id FK "userのID"
        date start_date "開始日"
        date end_date "終了日"
        datetime created_at "作成日"
        datetime updated_at "更新日"
    }

    menu_recipes {
        int id PK "ID"
        int menu_id FK "menuのID"
        int recipe_id FK "recipeのID"
        ENUM day_of_week "monday,tuesday,wednesday,thursday,friday,saturday,sunday"
        ENUM meal_section "breakfast,lunch,dinner"
        datetime created_at "作成日"
        datetime updated_at "更新日"
    }

    shopping_lists {
        int id PK "ID"
        int menu_id FK "menuのID"
        datetime created_at "作成日"
        datetime updated_at "更新日"
    }

     shopping_list_ingredients {
        int id PK "ID"
        int shopping_list_id FK "shopping_listのID"
        int ingredient_id FK "ingredientのID"
        float quantity "量"
        boolean is_checked "チェックボックス"
        datetime created_at "作成日"
        datetime updated_at "更新日"
    }
```
