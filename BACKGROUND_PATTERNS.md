# أنماط الخلفية الفاخرة - IMIC Design System

## 🌟 نظرة عامة

تم إضافة مجموعة متنوعة من أنماط الخلفية الفاخرة إلى مشروع IMIC لتحسين المظهر العام وتكسير اللون الأسود بإضافة لمسات ذهبية أنيقة.

## 🎨 الأنماط المتاحة

### 1. الخلفية الأساسية

```css
className="bg-background"
```

- الخلفية الافتراضية مع نمط دائري خفيف
- يتم تطبيقه تلقائياً على `body`

### 2. نمط النقاط

```css
className="bg-pattern-dots"
```

- نقاط ذهبية صغيرة منتظمة
- مثالي للخلفيات البسيطة

### 3. نمط الشبكة

```css
className="bg-pattern-grid"
```

- شبكة خطوط ذهبية خفيفة
- يعطي إحساساً بالتنظيم

### 4. نمط الموجات

```css
className="bg-pattern-waves"
```

- موجات مائلة أنيقة
- يضيف حركة للتصميم

### 5. نمط الدوائر

```css
className="bg-pattern-circles"
```

- دوائر ذهبية متدرجة
- نمط عضوي وجميل

### 6. نمط الفخامة

```css
className="bg-pattern-luxury"
```

- نمط هندسي فاخر
- مناسب للمواقع الفاخرة

### 7. نمط الشبكة المتقدمة

```css
className="bg-pattern-mesh"
```

- شبكة متقدمة مع تدرجات
- نمط معقد ومتطور

### 8. النمط الأنيق

```css
className="bg-pattern-elegant"
```

- نمط أنيق ومتطور
- مناسب للتصميمات الراقية

### 9. النمط الهندسي

```css
className="bg-pattern-geometric"
```

- نمط هندسي معقد
- يعطي إحساساً بالهندسة المتقدمة

### 10. نمط النجوم

```css
className="bg-pattern-stars"
```

- نجوم ذهبية متلألئة
- يضيف لمسة سحرية

### 11. نمط السداسيات

```css
className="bg-pattern-hexagons"
```

- أشكال سداسية أنيقة
- نمط عصرية ومتطور

### 12. نمط الماس

```css
className="bg-pattern-diamonds"
```

- أشكال ماسية فاخرة
- يعطي إحساساً بالفخامة

### 13. نمط المثلثات

```css
className="bg-pattern-triangles"
```

- مثلثات هندسية
- نمط ديناميكي

### 14. نمط الضوضاء

```css
className="bg-pattern-noise"
```

- نمط ضوضاء خفيف
- يضيف نسيجاً للخلفية

### 15. نمط التوهج

```css
className="bg-pattern-glow"
```

- توهجات ذهبية جميلة
- يضيف عمقاً للتصميم

### 16. النمط البسيط

```css
className="bg-pattern-minimal"
```

- نمط بسيط وأنيق
- مناسب للتصميمات البسيطة

### 17. النمط العضوي

```css
className="bg-pattern-organic"
```

- نمط عضوي طبيعي
- يعطي إحساساً بالطبيعة

## 🚀 كيفية الاستخدام

### 1. تطبيق على الصفحة كاملة

```tsx
export default function HomePage() {
  return (
    <div className="bg-pattern-dots min-h-screen">{/* محتوى الصفحة */}</div>
  );
}
```

### 2. تطبيق على قسم معين

```tsx
export default function ServicesSection() {
  return (
    <section className="bg-pattern-luxury py-20">{/* محتوى القسم */}</section>
  );
}
```

### 3. تطبيق على البطاقات

```tsx
export default function ServiceCard() {
  return (
    <div className="card-elegant bg-pattern-circles p-6">
      {/* محتوى البطاقة */}
    </div>
  );
}
```

### 4. تطبيق على Header

```tsx
export default function Header() {
  return (
    <header className="bg-pattern-mesh border-b border-border/20">
      {/* محتوى الهيدر */}
    </header>
  );
}
```

## 🎯 أفضل الممارسات

### 1. اختيار النمط المناسب

- **للصفحات الرئيسية**: استخدم أنماط بسيطة مثل `bg-pattern-dots` أو `bg-pattern-minimal`
- **للأقسام الفاخرة**: استخدم `bg-pattern-luxury` أو `bg-pattern-elegant`
- **للأقسام التقنية**: استخدم `bg-pattern-geometric` أو `bg-pattern-hexagons`

### 2. تجنب الإفراط

- لا تستخدم أكثر من نمط واحد في الصفحة
- تأكد من أن النمط لا يتعارض مع المحتوى

### 3. اختبار الأداء

- جميع الأنماط محسنة للأداء
- تستخدم CSS gradients بدلاً من الصور

### 4. التوافق مع الألوان

- جميع الأنماط تستخدم اللون الذهبي الأساسي للمشروع
- الشفافية محسنة لعدم التأثير على النصوص

## 🔧 التخصيص

### تغيير الألوان

يمكنك تخصيص الألوان في ملف `globals.css`:

```css
.bg-pattern-custom {
  background-image: radial-gradient(
    circle at 1px 1px,
    hsl(42 65% 55% / 0.08) 1px,
    transparent 0
  );
  background-size: 20px 20px;
}
```

### تغيير الحجم

```css
.bg-pattern-custom {
  background-size: 30px 30px; /* تغيير حجم النمط */
}
```

### تغيير الشفافية

```css
.bg-pattern-custom {
  background-image: radial-gradient(
    circle at 1px 1px,
    hsl(42 65% 55% / 0.15) 1px,
    transparent 0
  );
  /* زيادة الشفافية من 0.08 إلى 0.15 */
}
```

## 📱 التوافق مع الأجهزة

جميع الأنماط متوافقة مع:

- ✅ أجهزة سطح المكتب
- ✅ الأجهزة اللوحية
- ✅ الهواتف الذكية
- ✅ جميع المتصفحات الحديثة

## 🎨 معاينة الأنماط

يمكنك معاينة جميع الأنماط في:

```
http://localhost:3000/patterns
```

## 📞 الدعم

إذا كنت تحتاج مساعدة في استخدام الأنماط أو تخصيصها، لا تتردد في التواصل مع فريق التطوير.
